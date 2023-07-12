import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getFollows = (req, res) => {

    const type = req.query.type;

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid");
        let q=``;
        let values;
        if(type==="follow"){
            q = `SELECT u.id, u.profilePic, u.name FROM users AS u 
            JOIN relationships AS r ON u.id=r.followedUserId
            WHERE r.followerUserId = ? ORDER BY u.name`;
            values=userInfo.id;
            
        } else{
            q = `SELECT u.id, u.profilePic, u.name FROM users AS u 
            JOIN relationships AS r ON u.id=r.followerUserId
            WHERE r.followedUserId= ? ORDER BY u.name`;
            values=userInfo.id;
        }
        

        db.query(q, values, (err,data)=>{
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })

    
}