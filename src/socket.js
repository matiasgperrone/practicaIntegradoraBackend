import { Server } from "socket.io";
import ProductManager from "./controllers/productManager.js";

let io;

const productManager = new ProductManager();
const products = await productManager.getProducts();

export const init = (httpServer) => {
  io = new Server(httpServer);
  io.on("connection", (socketClient) => {
    console.log("Se ha conectado el cliente ", socketClient.id);
    socketClient.emit("products", products); // envia productos
  });
};

export const emitData = (event, data) => io.emit(event, data);
