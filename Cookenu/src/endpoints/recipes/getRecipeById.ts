import { Request, Response } from "express";
import connection from "../../connection";
import { getTokenData } from "../../services/authenticator";
import generateId from "../../services/idGenerator";
import { recipeTableName } from "../../types";

export default async function getRecipeById(
    req: Request,
    res: Response
    ): Promise<void> {
    try {
        const [recipe] = await connection(recipeTableName)      
        .where({id: req.params.id})

        if(!recipe){
            res.statusCode = 404
            throw new Error("Recipe not found")
        }


        res.send({
            id: recipe.id,
            title: recipe.title,
            description: recipe.created_at

        })

    } catch (error:any) {
        console.log(error.message);

        if (res.statusCode == 200) {
            res.status(500).send("Internal Server Error")
        }else {
            res.send(error.message)
        }
                
    }

}