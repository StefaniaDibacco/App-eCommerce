import Joi from 'joi';
import { Schema } from 'mongoose';

export const MensajesJoiSchema = Joi.object({
  userId: Joi.string().required(),
  tipo: Joi.string().valid('usuario', 'sistema').required(),
  mensaje: Joi.string().required(),
});

export type ObjectId = Schema.Types.ObjectId | string;

export interface MensajeI {
  userId: ObjectId;
  firstName: string;
  tipo: 'usuario' | 'sistema';
  mensaje: string;
}

export interface MensajesBaseClass {
  /* get(id?: string | undefined): Promise<UserI[]>;
  add(data: NewUserI): Promise<UserI>;
  update(id: string, newProductData: NewUserI): Promise<UserI>;
  delete(id: string): Promise<void>; */
}
