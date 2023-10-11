import express from "express";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", productsRouter, cartsRouter);

app.listen(port, () => {
  console.log("Server running on http://localhost:8080.");
});
