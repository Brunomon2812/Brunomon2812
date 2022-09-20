export type authenticationData = {
    id: string
}


export type recipe = {
    id: string
    title: string
    description: string
    createdAt: number
    authorId: string
}


export type user = {
    id: string
    name: string
    email: string
    password: string
}

export const userTableName = "cookenu_users"
export const recipeTableName = "cookenu_recipes"