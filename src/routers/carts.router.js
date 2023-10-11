import { Router } from "express";
import CartManager from "../controllers/cartManager.js";

const router = Router();
const carts = new CartManager();

router.post("/carts", async (req, res) => {
  res.send(await carts.addCarts());
});

router.get("/carts", async (req, res) => {
  res.send(await carts.readCarts());
});

router.get("/carts/:id", async (req, res) => {
  res.send(await carts.getCartById(req.params.id));
});

router.post("/carts/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await carts.addProductToCart(cartId, productId));
});

export default router;
