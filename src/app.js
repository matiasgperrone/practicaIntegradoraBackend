import express from "express";
import productsRouter from "./routers/products.router";
import cartsRouter from "./routers/carts.router";

const app = express();
const port = 8080;
// CLASE DE EXPRESS AVANZADO QUEDA UNA HORA Y DESPUES FALTA ROUTER TAMBIEN
app.use(express.json());
app.use(express.urlencoded({ extended: ture }));

app.use("/api", productsRouter, cartsRouter);

app.listen(port, () => {
  console.log("Server running on http://localhost:8080.");
});
