import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor() {
    this.path = "./src/products.json";
  }

  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  };

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };

  exist = async (id) => {
    let products = await this.readProducts();
    return products.find((prod) => prod.id === id);
  };

  addProducts = async (product) => {
    let productsBefore = await this.readProducts();
    product.id = uuidv4();
    let productAll = [...productsBefore, product];
    await this.writeProducts(productAll);
    return "Producto Agregado";
  };

  getProducts = async () => {
    return await this.readProducts();
  };

  getProductById = async (id) => {
    let productFind = await this.exist(id);
    if (!productFind) {
      return "Producto no encontrado";
    } else {
      return productFind;
    }
  };

  deleteProductById = async (id) => {
    let products = await this.readProducts();
    let existProduct = products.some((prod) => prod.id === id);
    if (existProduct) {
      let filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
      return "Producto eliminado";
    } else {
      return "El producto que desea eliminar no existe";
    }
  };

  updateProductById = async (id, updateProduct) => {
    let productFind = await this.exist(id);
    if (!productFind) {
      return "Producto no encontrado";
    } else {
      await this.deleteProductById(id);
      let productsOld = await this.readProducts();
      let products = [{ ...updateProduct, id: id }, ...productsOld];
      await this.writeProducts(products);
      return "Producto actualizado";
    }
  };
}

export default ProductManager;
