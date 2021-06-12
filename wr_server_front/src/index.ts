import express from "express";
import cors from 'cors'
import helmet from 'helmet'

import apiRouter from './router/api/index'

const app: express.Express = express()

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}


if (process.env.mode !== "production") {
    app.use(cors(corsOptions))
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet({
    contentSecurityPolicy: false,
}))

// cspミドルウェア
// function setCSP(req: express.Request, res: express.Response, next: express.NextFunction): void {
//     const csp: string = `default-src https: 'self' 'unsafe-inline' ${process.env.mode === "production" ? '' : 'http://localhost:3000 http://192.168.10.123:8080'}; connect-src http: 'unsafe-inline'`
//     res.set("Content-Security-Policy", csp);
//     next()
// }

// app.use(setCSP)

// 静的ファイル置き場
app.use(express.static(__dirname + '/dist'))

// フロントエンドのエントリーポイント
app.get('/', (req: express.Request, res: express.Response) => {
    res.redirect('/dist')
})


// api
app.use('/api', apiRouter)

// エラーハンドラ
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(400)
    console.log(err)
    res.send(err.toString() || 'err')
})

// 404でリダイレクト
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.redirect("/")
});

const port = process?.env?.PORT || 3000

app.listen(port, () => (
    console.log(`start listening at port:${port}`)
))