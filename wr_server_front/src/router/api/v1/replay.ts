import express from "express";

import db, { createReplayDoc, deleteDoc, getReplay, getReplayList, replaysRef } from '../../../components/db';
import { UploadResult, WargameReplayHeader } from "../../../types";
import { convertHeader, findHeader, fileName, sanitize, autoId } from "../../../util";
import { formatISO, parseISO } from 'date-fns'
import { bucket, deleteReplay, getDownloadURL, uploadReplay } from "../../../components/storage";
import { Firestore } from "@google-cloud/firestore";

import multer from 'multer'
import { UploadResponse } from "@google-cloud/storage";
import isDate from "date-fns/isDate";

const storage: multer.StorageEngine = multer.memoryStorage()
// 15MB以内
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024, files: 1 } })

const router: express.Router = express.Router()

router.post(
    '/upload', upload.fields([{ name: 'file', maxCount: 1 }]),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('upload')
        console.log(req.body)
        try {
            const commentRaw: string | undefined = req.body?.comment
            // コメント
            const comment: string = sanitize.encode(commentRaw)

            const deletePinRaw: string | undefined = req.body?.pin || autoId(10)
            // 削除キー
            const deletePin: string | null = sanitize.encode(deletePinRaw)
            // 投稿されたファイル
            const f: Express.Multer.File | undefined = (req.files as any).file[0] as Express.Multer.File
            const originalName: string = f.originalname
            // ファイル名に拡張子が無い。
            if (originalName.indexOf('.wargamerpl2') === -1) {
                throw Error('invalid file name')
            }
            // パースする
            const data: string | undefined = f.buffer?.toString()

            const headerStr: string | null = findHeader(data)
            // ヘッダーが見つからない
            if (!headerStr) {
                throw Error('No header error')
            }
            const headerRaw = JSON.parse(headerStr)
            const header: WargameReplayHeader | null = convertHeader(headerRaw)
            if (!header) {
                throw Error("Invalid header error")
            }
            // ここでファイルをアップロード
            const docID: string = autoId(30)
            const filePath: string = `replay/${docID}/${originalName}`

            const uploadResult: boolean = await uploadReplay(filePath, f.buffer)

            if (!uploadResult) {
                throw Error
            }

            const resultId: string = await createReplayDoc(docID, header, filePath, originalName, comment, deletePin)

            const reaponsePayload: UploadResult = {
                id: resultId,
                pin: deletePin,
                date: formatISO(new Date())
            }
            res.status(200)
            res.json(reaponsePayload)
            res.send()
            return
        } catch (e: any) {
            next(e)
        }

    }
)

router.post(
    '/del',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('del')
        console.log(req.body)
        try {
            // ID
            const id: string | undefined = req.body?.id
            // 削除キー
            const deletePin: string | undefined = req.body?.pin
            if (!id) {
                throw Error('invaild formData error')
            }

            const targetDoc: FirebaseFirestore.DocumentSnapshot = await getReplay(id)
            const targetData: FirebaseFirestore.DocumentData | undefined = targetDoc.data()
            // 削除pinの確認
            const targetPin: string | undefined = targetData?.deletePin
            if (typeof targetPin === 'string' && deletePin !== targetPin) {
                throw Error('invalid delete pin error')
            }
            // 元ファイルの削除
            const filePath: string | undefined = targetData?.filePath
            if (filePath) {
                await deleteReplay(filePath)
            }
            await deleteDoc(id)

            const reaponsePayload = {
                id,
                date: formatISO(new Date())
            }
            res.status(200)
            res.json(reaponsePayload)
            res.send()
            return
        } catch (e: any) {
            next(e)
        }

    }
)

router.post('/download', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const docId: string | undefined = req.body?.id?.toString()
    if (!docId) {
        res.status(400)
        res.send()
        return
    }
    try {
        const targetDoc: FirebaseFirestore.DocumentSnapshot = await getReplay(docId)
        const fileName: string = targetDoc?.data()?.originalName || 'replay.wargamerpl2'
        const filePath: string = targetDoc.data()?.filePath
        if (!filePath) {
            throw Error
        }
        const url: string | void = await getDownloadURL(filePath)
        console.log(url)
        if (!url) {
            throw Error
        }
        res.status(200)
        res.json({ url, id: docId })
        return
    } catch (e: any) {
        next(e)

    }
})

router.post('/list', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('list')
    console.log(req.body)
    const startDateStr: string | undefined = req.body?.start ? req.body.start.toString() : undefined
    const limit: number = typeof req.body?.limit === "string" ? parseInt(req.body.limit) : 30
    console.log(limit, startDateStr)
    try {
        const startDate: Date | undefined = startDateStr ? parseISO(startDateStr) : undefined
        const replayList: FirebaseFirestore.QuerySnapshot = await getReplayList(limit, startDate)
        const resultList: any[] = []
        if (!replayList.empty) {

            replayList.forEach((doc: FirebaseFirestore.DocumentSnapshot) => {
                const data: FirebaseFirestore.DocumentData | undefined = doc.data()
                if (!data) return
                data.createdDate = formatISO(data.createdDate.toDate())
                data.updatedDate = formatISO(data.updatedDate.toDate())
                delete data.deletePin
                resultList.push({ id: doc.id, ...data })
            })
        }
        console.log(resultList.length)
        resultList.forEach((e: any) => {
            console.log(e?.id, e.createdDate)
        })
        res.status(200)
        res.json({ replay: resultList, replayNumber: resultList.length })
        return
    } catch (e: any) {
        next(e)
    }
})

router.post('/detail', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Content-Type', 'text/plain');
    console.log('detail')
    console.log(req.body)

    const id: string | undefined = req.body.id?.toString()
    try {
        if (!id) {
            throw Error('invaild formData error')
        }

        const gameDataRaw = await getReplay(id)
        const gameData = gameDataRaw.data()
        if (!gameData) {
            res.status(404)
            res.json({ id, message: "no data" })
            res.send()
            return
        }
        gameData.createdDate = gameData.createdDate.toDate()
        gameData.updatedDate = gameData.updatedDate.toDate()
        delete gameData.deletePin
        res.status(200)
        res.json({ id, ...gameData })
        res.send()
        return
    } catch (error) {
        next(error)
    }
})

export default router