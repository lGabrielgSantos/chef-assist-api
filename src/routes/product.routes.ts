import { Router } from "express";
import { getTestProduct } from "../controllers/product.controller";

const router = Router();

router.get("/test", getTestProduct);

export default router;
