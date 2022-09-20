import { Request, Response } from "express";
import connection from "../../connection";
import { getTokenData } from "../../services/authenticator";
import { userTableName } from "../../types";

export default async function getUserById(
    req: Request,
    res: Response
): Promise<void> {
    try {
        
        const token: string = req.headers.authorization!
        const userId = req.params.id

        const tokenData = getTokenData(token)

        if(!tokenData){
            res.statusCode = 401
            throw new Error("Unauthorized")
        }

        const [user] = await connection(userTableName)
            .where({ id: userId})

            if(!user){
                res.statusCode = 404
                throw new Error ("User not found")
            }

            const {id, email, name, } = user   
            
        res.send({ id, email, name})

    } catch (error:any){
        console.log(error.message);
        
        if (res.statusCode === 200) {
            res.status(500).send("Internal server error")
        }else {
            res.send(error.message)
        }
    }
}