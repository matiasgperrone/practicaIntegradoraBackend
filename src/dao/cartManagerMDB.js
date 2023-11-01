import cartModel from "../models/cart.model.js";

export default class CartManagerMDB {
  static get(query = {}) {
    const criteria = {};
    if (query.products) {
      criteria.products = query.products;
    }
    return cartModel.find(criteria);
  }

  static async getCartById(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("El carrito no existe 😢");
    }
    return cart;
  }

  static async createCart(data) {
    const cart = await cartModel.create(data);
    console.log("Se ha creado el carrito 👌");
    return cart;
  }

  static async updateCartById(cid, data) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("El carrito no existe 😢");
    }
    const criteria = { _id: cid };
    const operation = { $set: data };
    await cartModel.updateOne(criteria, operation);
    console.log("El carrito ha sido actualizado 😁");
  }

  static async deleteCartById(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("El carrito no existe 😢");
    }
    const criteria = { _id: cid };
    await cartModel.deleteOne(criteria);
    console.log("El carrito ha sido eliminado 🗑️");
  }
}
