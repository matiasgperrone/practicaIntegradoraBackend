import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const router = Router();

const product = new ProductManager();

router.get("/products", async (req, res) => {
  res.send(await product.getProducts());
});

router.get("/products/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.getProductById(id));
});

router.delete("/products/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.deleteProductById(id));
});

router.post("/products", async (req, res) => {
  let newProduct = req.body;
  res.send(await product.addProducts(newProduct));
});

router.put("/products/:id", async (req, res) => {
  let id = req.params.id;
  let updateProduct = req.body;
  res.send(await product.updateProductById(id, updateProduct));
});

export default router;
