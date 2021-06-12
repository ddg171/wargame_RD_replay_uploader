import * as Firestore from '@google-cloud/firestore'
import { isDate, isValid } from 'date-fns'

import { WargameReplayHeader } from '../types'


const db: Firestore.Firestore = new Firestore.Firestore({
    projectId: "wargamereplay",
    keyFilename: __dirname + "/../private/db.json"
})

export default db
export const replaysRef: Firestore.CollectionReference = db.collection(process.env.COLLECTION_NAME || 'replay_dev')

// ドキュメント取得関数
export async function getReplay(id: string): Promise<Firestore.DocumentSnapshot> {
    // idが無い
    if (!id) {
        throw Error("no id error")
    }
    // データを取得
    const targetDoc: Firestore.DocumentSnapshot = await replaysRef.doc(id).get()
    // 存在しない
    if (!targetDoc.exists) {
        throw Error("no doc error")
    }
    return targetDoc
}

// ドキュメントの複数取得
export async function getReplayList(limit: number = 10, startDate: Date | undefined = undefined) {
    const replayListRefTemp = replaysRef.orderBy('createdDate', "desc").limit(limit || 30)
    // Date型だがinvalid dateな場合はエラーを投げる。
    if (isDate(startDate) && !isValid(startDate)) {
        throw Error("invalid date")
    }
    const replayListRefPagaNation = startDate ? replayListRefTemp.startAt(startDate) : replayListRefTemp
    return await replayListRefPagaNation.get()
}

// ドキュメント作成関数
export async function createReplayDoc(docId: string, header: WargameReplayHeader, filePath: string, originalName: string, comment: string | null | undefined = null, deletePin: string | null | undefined = null): Promise<string> {
    if (!filePath) {
        throw Error('no file error')
    }
    const currentTimeStamp = Firestore.FieldValue.serverTimestamp()
    const payload = {
        ...header,
        originalName,
        filePath,
        deletePin: deletePin || null,
        comment: comment || "",
        createdDate: currentTimeStamp,
        updatedDate: currentTimeStamp
    }

    return await replaysRef.doc(docId).set(payload).then((result: Firestore.WriteResult) => {
        return docId
    })
}

// ドキュメント削除用関数
export async function deleteDoc(id: string): Promise<Firestore.WriteResult> {
    return await replaysRef.doc(id).delete()
}