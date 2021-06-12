import * as Storage from '@google-cloud/storage'

const storage: Storage.Storage = new Storage.Storage({
    projectId: "wargamereplay",
    keyFilename: __dirname + "/../private/storage.json"
})

const BUCKET_NAME: string = process.env.BUCKET_NAME || "replay-data-bucket-dev"

export default storage

export const bucket = storage.bucket(BUCKET_NAME)

export function uploadReplay(filePath: string, buffer: Buffer): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const blob = bucket.file(filePath);
        // ファイルを読み込む
        const blobStream = blob.createWriteStream()

        // エラーハンドラ
        blobStream.on('error', (err: any) => {
            reject(err)
        })

        // 成功時
        blobStream.on('finish', () => {
            resolve(true)
        });
        blobStream.end(buffer);

    })

}

export async function deleteReplay(filePath: string) {
    return await bucket.file(filePath).delete()

}

export async function getDownloadURL(filePath: string): Promise<string | void> {
    const expires: number = new Date().getTime() + (24 * 60 * 60 * 10)
    const result = await bucket.file(filePath).getSignedUrl({ action: "read", expires })
    console.log(result)
    return result[0]
}