import {db} from "../connect.js";

export const getSearch = (req, res) => {
    const text = "%"+req.query.text+"%";
    const q = "SELECT * FROM users WHERE name LIKE ?";

    db.query(q, [text], (err, data)=>{
        if (err) return res.status(500).json(err);
        return res.json(data);
    });

}