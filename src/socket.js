import { Server } from "socket.io";
import ProductManager from "./controllers/productManager.js";

let io;

const productManager = new ProductManager();
const products = await productManager.getProducts();

export const init = (httpServer) => {
  io = new Server(httpServer);
  io.on("connection", async (socketClient) => {
    console.log("Cliente conectado", socketClient.id);
    const products = await productManager.getProducts();
    socketClient.emit("listProducts", products);
  });
  console.log("server socket running");
};

export const emitData = (event, data) => io.emit(event, data);
