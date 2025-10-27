import { Router } from "express"
import { AuthController } from "../../controllers/auth.controller"

const router = Router()
const controller = new AuthController()

router.post("/register", controller.register.bind(controller))
router.post("/login", controller.login.bind(controller))
router.get("/me", controller.me.bind(controller)) // rota protegida

export default router
