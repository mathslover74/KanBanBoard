// import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import sql from "../config/Database.js"
 
export const refreshToken = async(req, res) => {
    try {
        
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        sql.query(
            `
            SELECT * FROM accounts where refresh_Token = '${refreshToken}';
            `,
            (err, result) => {
                console.log("refresh reach");
                console.log(err)
                if (err) {
                    res.status(400).json(err)
                } else if (result.length === 0){
                    res.status(400).json({msg: "Error token"});
                } else {

                    // if(result.length === 0){
                    //     res.status(400).json({msg: "Error token"});
                    // }
    
                    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                        if(err) return res.sendStatus(403);
                        const username = result[0].username;
                        const email = result[0].email;
    
                        const accessToken = jwt.sign({username, email}, process.env.ACCESS_TOKEN_SECRET,{
                            expiresIn: '15s'
                        });
                        res.status(200).json({ accessToken });
                    });
                }

            }
        )
    } catch (e) {
        console.log(e)
    }
    // try {
    //     const refreshToken = req.cookies.refreshToken;
    //     if(!refreshToken) return res.sendStatus(401);
    //     const user = await Users.findAll({
    //         where:{
    //             refresh_token: refreshToken
    //         }
    //     });
    //     if(!user[0]) return res.sendStatus(403);
    //     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    //         if(err) return res.sendStatus(403);
    //         const userId = user[0].id;
    //         const name = user[0].name;
    //         const email = user[0].email;
    //         const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
    //             expiresIn: '15s'
    //         });
    //         res.json({ accessToken });
    //     });
    // } catch (error) {
    //     console.log(error);
    // }
}