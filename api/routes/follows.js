import express from "express";
import {getFollows} from "../controllers/follow.js";

const router = express.Router()

router.get("/", getFollows)

export default router