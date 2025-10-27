import { Router } from "express";
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";
import customerRoutes from "./customer.routes";

const router = Router();

router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/customers", customerRoutes);
router.get("/", (req, res) => {
  res.send("Welcome to the API v1");
});

export default router;
