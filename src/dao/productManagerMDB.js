import productModel from "../models/product.model.js";

export default class ProductManagerMDB {
  static get(query = {}) {
    const criteria = {};
    if (query.title) {
      criteria.title = query.title;
    }
    return productModel.find(criteria);
  }

  static async getProductById(pid) {
    const product = await productModel.findById(pid);
    if (!product) {
      throw new Error("El producto no existe 😢");
    }
    return product;
  }

  static async createProduct(data) {
    const product = await productModel.create(data);
    console.log("Se ha creado el producto 👌");
    return product;
  }

  static async updateProductById(pid, data) {
    const product = await productModel.findById(pid);
    if (!product) {
      throw new Error("El producto no existe 😢");
    }
    const criteria = { _id: pid };
    const operation = { $set: data };
    await productModel.updateOne(criteria, operation);
    console.log("El producto ha sido actualizado 😁");
  }

  static async deleteProductById(pid) {
    const product = await productModel.findById(pid);
    if (!product) {
      throw new Error("El producto no existe 😢");
    }
    const criteria = { _id: pid };
    await productModel.deleteOne(criteria);
    console.log("El producto ha sido eliminado 🗑️");
  }
}
