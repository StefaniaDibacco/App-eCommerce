import { Schema } from 'mongoose';
import Joi from 'joi';

export const ordenJoiSchema = Joi.object({
  _id: Joi.string(),
  userId: Joi.string().required(),
  items: Joi.object({
    productId: Joi.string().required(),
    cantidad: Joi.number().required(),
    precio: Joi.number().required(),
  }).required(),
  timeStamp: Joi.number().required(),
  estado: Joi.string().required(),
  total: Joi.number().required(),
});

export type ObjectId = Schema.Types.ObjectId | string;

export interface ItemsI {
  productId: string;
  cantidad: number;
  precio: number;
}

export interface OrdenI {
  _id?: ObjectId;
  userId: ObjectId;
  items: ItemsI[];
  timeStamp: number;
  estado: string;
  total: number;
}

export interface NewOrden {
  items: ItemsI[];
  userId: ObjectId;
  total: number;
}

export interface OrdenBaseClass {
  // get(id: string): Promise<CartI>;
  // createCart(userId: string): Promise<CartI>;
  // addProduct(cartId: string, product: ProductCart): Promise<CartI>;
  // deleteProduct(cartId: string, product: ProductCart): Promise<CartI>;
}
