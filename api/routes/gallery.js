import express from "express";
import { getPictures, addPicture } from "../controllers/gallery.js";

const router = express.Router()

router.get("/getpics", getPictures)
// router.get("/picture", getPicture)
router.post("/addpic", addPicture)

export default router