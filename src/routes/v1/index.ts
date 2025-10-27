import { Router } from "express";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";
import customerRoutes from "./customer.routes";
import authRoutes from "./auth.routes";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.use("/products", authenticate,  productRoutes);
router.use("/orders", authenticate, orderRoutes);
router.use("/customers", authenticate, customerRoutes);
router.get("/", (req, res) => {
  res.send("Welcome to the API v1");
});
router.use("/auth",authRoutes)

export default router;
