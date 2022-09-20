import { Request, Response } from "express";
import connection from "../../connection";
import { generateToken } from "../../services/authenticator";
import { compareHash } from "../../services/hashManager";
import { userTableName } from "../../types";

export default async function login(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.statusCode = 422
            throw new Error ("'name', 'email' and 'password' required")
        }

        const [user] = await connection(userTableName)
            .where({ email })

        const passwordIsCorrect: boolean = compareHash(password, user.password)

        if (!user || !password) {
            res.statusCode = 401
            throw new Error ("invalid credentials")
        }

        if (!passwordIsCorrect) {
            res.statusCode = 401
            throw new Error("Invalide Credentials")
        }

        const token = generateToken({id: user.id})

        res.send({token})

    } catch (error: any) {
        console.log(error.message);

        if (res.statusCode === 200) {
            res.status(500).send("Internal server error")

        } else {
            res.send(error.message)
        }

    }
}