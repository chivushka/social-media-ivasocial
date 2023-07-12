import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getPictures = (req, res) => {

    const albumName = req.query.name;

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        let q = "";

        if (albumName==="all") {
            q = "SELECT img FROM gallery WHERE userId = ? ";

        } else if (albumName == "avatar") {
            q = "SELECT id, img FROM gallery WHERE type = 1 AND userId = ?";
        } else if (albumName == "cover") {
            q = "SELECT id, img FROM gallery WHERE type = 2 AND userId = ?";
        } else{
            q = "SELECT id, img FROM gallery WHERE userId = ? ";
        }
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })


    })
}

export const addPicture = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "INSERT INTO gallery(`img`,`userId`, `type`) VALUES (?)";

        const values = [
            req.body.img,
            userInfo.id,
            req.body.type
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Picture has been added");
        })
    })

}