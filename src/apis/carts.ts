import { CartFactoryDAO, TipoPersistencia } from '../models/carts/cart.factory';
import { CartI } from '../models/carts/cart.interface';
import { UserAPI } from './users';
/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.LocalMongo;

class Cart {
  private carts;

  constructor() {
    this.carts = CartFactoryDAO.get(tipo);
  }

  async getCart(userId: string): Promise<CartI> {
    return this.carts.get(userId);
  }

  async createCart(userId: string): Promise<CartI> {
    const user = await UserAPI.getUsers(userId);

    if (!user.length)
      throw new Error('User does not exist. Error creating cart');

    const newCart = await this.carts.createCart(userId);
    return newCart;
  }

  async addProduct(
    userId: string,
    productId: string,
    cantidad: number
  ): Promise<CartI> {
    const addProduct = {
      _id: productId,
      cantidad: cantidad,
      timeStamps: Date.now(),
    };

    const updatedCart = await this.carts.addProduct(userId, addProduct);
    return updatedCart;
  }

  async deleteProudct(userId: string, productId: string, cantidad: number) {
    const deleteProduct = {
      _id: productId,
      cantidad,
    };

    const updatedCart = await this.carts.deleteProduct(userId, deleteProduct);
    return updatedCart;
  }
}

export const CartAPI = new Cart();
