import { CartAPI } from '../apis/carts';
import { Request, Response } from 'express';
import { productsAPI } from '../apis/productos';
import { CartI } from '../models/carts/cart.interface';

class Cart {
  async getCartByUser(req: Request, res: Response) {
    const user: any = req.body.user;
    const cart = await CartAPI.getCart(user._id);
    res.json(cart);
  }

  async addProduct(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);
    console.log(user, cart);
    const { productId, cantidad } = req.body;

    if (!productId || !cantidad)
      return res.status(400).json({ msg: 'Invalid body parameters' });

    const product = await productsAPI.getProducts(productId);

    if (!product.length)
      return res.status(400).json({ msg: 'product not found' });

    if (parseInt(cantidad) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    const updatedCart: CartI = await CartAPI.addProduct(
      cart._id,
      productId,
      parseInt(cantidad)
    );
    return res.json({ msg: 'Product added', cart: updatedCart });
  }

  async deleteProduct(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);

    const { productId, cantidad } = req.body;

    if (!productId || !cantidad)
      return res.status(400).json({ msg: 'Invalid body parameters' });

    if (parseInt(cantidad) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    const updatedCart = await CartAPI.deleteProudct(
      cart._id,
      productId,
      parseInt(cantidad)
    );
    return res.json({ msg: 'Product deleted', cart: updatedCart });
  }

  async submit(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);
    if (!cart.productos)
      return res.status(400).json({ msg: 'Invalid products cart empty' });
    const order = await OrderApi.createOrder(cart);
  }
}

export const CartController = new Cart();
