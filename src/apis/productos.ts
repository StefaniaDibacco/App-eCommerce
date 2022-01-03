import {
  newProductI,
  ProductI,
  ProductQuery,
} from '../models/products/products.interface';
import {
  NoticiasFactoryDAO,
  TipoPersistencia,
} from '../models/products/products.factory';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.LocalMongo;

class prodAPI {
  private productos;

  constructor() {
    this.productos = NoticiasFactoryDAO.get(tipo);
  }

  async getProducts(id: string | undefined = undefined): Promise<ProductI[]> {
    if (id) return this.productos.get(id);

    return this.productos.get();
  }

  async addProduct(productData: newProductI): Promise<ProductI> {
    const newProduct = await this.productos.add(productData);
    return newProduct;
  }

  async updateProduct(id: string, productData: newProductI) {
    const updatedProduct = await this.productos.update(id, productData);
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    return await this.productos.delete(id);
  }

  async query(options: ProductQuery) {
    return await this.productos.query(options);
  }
}

// eslint-disable-next-line new-cap
export const productsAPI = new prodAPI();
