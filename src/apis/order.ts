import { CartI } from '../models/carts/cart.interface';
import {
  OrdenFactoryDAO,
  TipoPersistencia,
} from '../models/order/order.factory';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.LocalMongo;

class Orden {
  private Order;

  constructor() {
    this.Order = OrdenFactoryDAO.get(tipo);
  }

  async create(carrito: CartI) {
    return await this.Order.createOrder(carrito);
  }

  async get(userId: string, orderId: string) {
    return await this.Order.getOrder(userId, orderId);
  }

  async complete(orderId: string) {
    return await this.Order.completeOrder(orderId);
  }
}

export const OrdenApi = new Orden();
