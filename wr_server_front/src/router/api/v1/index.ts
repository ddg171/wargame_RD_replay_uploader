import express from "express";
import replayRouter from './replay'

const router: express.Router = express.Router()

router.use('/replay', replayRouter)

export default router