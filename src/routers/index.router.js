import { Router } from "express";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import ProductManager from "../controllers/productManager.js";
import { emitData } from "../socket.js";

const router = Router();

const product = new ProductManager();

router.get("/", async (req, res) => {
  const products = await product.getProducts();
  res.render("home", {
    products,
  });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await product.getProducts();
  res.render("realTimeProducts", {
    products,
  });
});

export default router;
