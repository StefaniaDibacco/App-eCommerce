/* eslint-disable no-unused-vars */
import Joi from 'joi';
import { Schema } from 'mongoose';

export const MensajesJoiSchema = Joi.object({
  userId: Joi.string().required(),
  tipo: Joi.string().valid('usuario', 'sistema').required(),
  mensaje: Joi.string().required(),
});

export type ObjectId = Schema.Types.ObjectId | string;
export enum Tipo {
  Usuario = 'usuario',
  Sistema = 'sistema',
}

export interface MensajeI {
  userId: ObjectId;
  firstName?: string;
  tipo: Tipo;
  mensaje: string;
}

export interface MensajesBaseClass {
  
}
