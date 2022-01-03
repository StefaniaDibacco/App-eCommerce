import { Schema } from 'mongoose';
import Joi from 'joi';
import { CartI } from '../carts/cart.interface';

export const ordenJoiSchema = Joi.object({
  _id: Joi.string(),
  userId: Joi.string().required(),
  items: Joi.object({
    productId: Joi.string().required(),
    cantidad: Joi.number().required(),
    precio: Joi.number().required(),
  }).required(),
  timeStamp: Joi.number().required(),
  estado: Joi.string()
    .required()
    .valid('Generado', 'Pagado', 'Enviando', 'Finalizado'),
  total: Joi.number().required(),
});

export type ObjectId = Schema.Types.ObjectId | string;

export interface ItemsI {
  productId: string;
  cantidad: number;
  precio?: number;
}

export interface OrdenI {
  _id?: ObjectId;
  userId: ObjectId;
  items: ItemsI[];
  timeStamp?: number;
  estado: string;
  total: number;
}

export interface NewOrden {
  items: ItemsI[];
  userId: ObjectId;
  total: number;
  timeStamp?: number;
  estado: string;
}

export interface OrdenBaseClass {
  createOrder(carrito: CartI): Promise<OrdenI>;
  getOrder(
    userId: string,
    orderId: string
  ): Promise<OrdenI> | Promise<OrdenI[]>;
  completeOrder(orderId: string): Promise<OrdenI>;
}
