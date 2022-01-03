import { OrdenApi } from '../apis/order';
import { Request, Response } from 'express';
import { CartAPI } from '../apis/carts';

class Orden {
  async get(req: Request, res: Response) {
    const user: any = req.user;
    const orderId: any = req.query.orderId;
    /* TODO validaciones */
    const cart = await OrdenApi.get(user._id, orderId);
    return res.json(cart);
  }

  async create(req: Request, res: Response) {
    const user: any = req.user;
    /* TODO validaciones */
    const carrito = await CartAPI.getCart(user._id);
    return await OrdenApi.create(carrito);
  }

  async complete(req: Request, res: Response) {
    const orderId: any = req.body.orderId;
    /* TODO validaciones */
    return await OrdenApi.complete(orderId);
  }
}

export const OrdenController = new Orden();
