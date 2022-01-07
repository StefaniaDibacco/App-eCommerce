import { Schema } from 'mongoose';
import Joi from 'joi';

export const cartJoiSchema = Joi.object({
  userId: Joi.string().required(),
  productos: Joi.array()
    .items(
      Joi.object({
        cantidad: Joi.number().required(),
        _id: Joi.string().required(),
        timeStamps: Joi.number().required(),
      })
    )
    .required(),
  direccion: Joi.object({
    calle: Joi.string().required(),
    altura: Joi.number().required(),
    codigoPostal: Joi.number().required(),
    piso: Joi.string().optional(),
    departamento: Joi.number().optional(),
  }).required(),
});

export type productReference = Schema.Types.ObjectId | string;

export interface ProductCart {
  cantidad: number;
  _id: string;
  timeStamps?: number;
  precio?: number;
}

export interface DireccionI {
  calle: string;
  altura: number;
  codigoPostal: number;
  piso?: string;
  departamento?: string;
}

export interface CartI {
  _id: string;
  userId: productReference;
  productos: ProductCart[];
  direccion: DireccionI;
}

export interface CartBaseClass {
  
  get(id: string): Promise<CartI>;
  createCart(userId: string): Promise<CartI>;
  addProduct(cartId: string, product: ProductCart): Promise<CartI>;
  deleteProduct(cartId: string, product: ProductCart): Promise<CartI>;
  
}
