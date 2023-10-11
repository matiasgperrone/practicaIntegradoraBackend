import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import ProductManager from "./productManager.js";

const productsAll = new ProductManager();

class CartManager {
  constructor() {
    this.path = "./src/carts.json";
  }

  existCart = async (id) => {
    let carts = await this.readCarts();
    return carts.find((cart) => cart.id === id);
  };

  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  };

  writeCarts = async (cart) => {
    await fs.writeFile(this.path, JSON.stringify(cart));
  };

  addCarts = async () => {
    let cartsBefore = await this.readCarts();
    let id = uuidv4();
    let cartsAll = [{ id: id, products: [] }, ...cartsBefore];
    await this.writeCarts(cartsAll);
    return "Carrito Agregado";
  };

  getCartById = async (id) => {
    let cartFind = await this.existCart(id);
    if (!cartFind) {
      return "Carrito no encontrado";
    } else {
      return cartFind;
    }
  };

  addProductToCart = async (cartId, productId) => {
    let cartFind = await this.existCart(cartId);
    if (!cartFind) return "Carrito no encontrado";
    let productById = await productsAll.exist(productId);
    if (!productById) return "Producto no encontrado";

    let cartsAll = await this.readCarts();
    let cartFilter = cartsAll.filter((cart) => cart.id != cartId);

    if (cartFind.products.some((prod) => prod.id === productId)) {
      let productInCart = cartFind.products.find(
        (prod) => prod.id === productId
      );
      productInCart.quantity++;
      let cartComplete = [cartFind, ...cartFilter];
      await this.writeCarts(cartComplete);
      return "Se sumó una unidad más del producto";
    }

    cartFind.products.push({ id: productById.id, quantity: 1 });
    let cartComplete = [cartFind, ...cartFilter];
    await this.writeCarts(cartComplete);

    return "Producto agregado al carrito";
  };
}

export default CartManager;
