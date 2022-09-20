import { sign } from "jsonwebtoken"
import app from "./app"
import createRecipe from "./endpoints/recipes/createRecipe"
import getRecipeById from "./endpoints/recipes/getRecipeById"
import getProfile from "./endpoints/users/getProfile"
import getUserById from "./endpoints/users/getUserById"
import login from "./endpoints/users/login"
import signup from "./endpoints/users/signup"

app.post("/users/signup", signup)
app.post("/users/login", login)
app.get("/users/profile", getProfile)
app.get("/users/:id/profile", getUserById)

app.post("/recipe", createRecipe)
app.get("/recipe/:id", getRecipeById)

