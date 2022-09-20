import { Request, Response } from "express";
import connection from "../../connection";
import { getTokenData } from "../../services/authenticator";
import generateId from "../../services/idGenerator";
import { recipeTableName } from "../../types";

export default async function createRecipe(
    req: Request,
    res: Response
    ): Promise<void> {
    try {
        const token = req.headers.authorization
        const {title, description} = req.body 

        const tokenData = getTokenData(token!)

        if(!tokenData){
            res.statusCode = 401
            throw new Error("Unauthorized")
        }

        if(!title || ! description){
            res.statusCode = 422
            throw new Error("'Title' and 'description' required")
        }

        const id = generateId()

        const createdAt = new Date()

        await connection(recipeTableName)
        .insert({
            id,
            title,
            description,
            created_at: createdAt,
            author_id: tokenData!.id
        })

        res.send("Recipe successfuly created!")
        
    } catch (error:any) {
        console.log(error.message);

        if (res.statusCode == 200) {
            res.status(500).send("Internal Server Error")
        }else {
            res.send(error.message)
        }
                
    }

}