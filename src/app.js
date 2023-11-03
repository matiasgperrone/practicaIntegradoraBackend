import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import indexRouter from "./routers/index.router.js";
import { __dirname } from "./utils.js";
import productsRouter from "./routers/products.router.js";
import productsAPIRouter from "./routers/api/products.router.js";
import cartsRouter from "./routers/carts.router.js";

const app = express();

app.use("/api", productsAPIRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/api", productsRouter, cartsRouter);
app.use("/", indexRouter);
app.get("/realTimeProducts", indexRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error desconocido 😨: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: "error", message });
});

export default app;
