import Joi from 'joi';
import { DireccionI } from '../carts/cart.interface';

const PASS_RE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const INTER = /^\+[1-9]{1}[0-9]{3,14}$/;

export const userJoiSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  age: Joi.number().optional(),
  cellphone: Joi.string().regex(INTER).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(PASS_RE).required(),
  admin: Joi.boolean().required(),
}).unknown();

export interface NewUserI {
  firstName: string;
  lastName: string;
  age: number;
  cellphone: string;
  email: string;
  password: string;
  admin: boolean;
  direccion: DireccionI;
}

export interface UserI {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  cellphone: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface UserQuery {
  email?: string;
}

export interface UserBaseClass {
  get(id?: string | undefined): Promise<UserI[]>;
  add(data: NewUserI): Promise<UserI>;
  update(id: string, newProductData: NewUserI): Promise<UserI>;
  delete(id: string): Promise<void>;
}
