import { OrdenApi } from '../apis/order';
import { Request, Response } from 'express';
import { CartAPI } from '../apis/carts';

class Orden {
  async get(req: Request, res: Response) {
    const user: any = req.user;
    const orderId: any = req.query.orderId;
    const cart = await OrdenApi.get(user._id, orderId);
    return res.json(cart);
  }

  async create(req: Request, res: Response) {
    const user: any = req.user;
    const carrito = await CartAPI.getCart(user._id);
    return await OrdenApi.create(carrito);
  }

  async complete(req: Request, res: Response) {
    const orderId: any = req.body.orderId;

    if (!orderId || typeof orderId !== 'string') {
      return res.status(400).json({
        msg: 'Orden solicitada inexistente',
      });
    }
    try {
      const result = await OrdenApi.complete(orderId);
      return res.send({ result, msg: 'Orden Completada' });
    } catch (error: any) {
      return res.send({ error: error.message });
    }
  }
}

export const OrdenController = new Orden();
