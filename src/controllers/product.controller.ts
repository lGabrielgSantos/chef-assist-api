import { Request, Response } from "express";
import * as productService from "../services/product.services";

export async function getTestProduct(req: Request, res: Response) {
  try {
    const product = await productService.getProductTest();
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
