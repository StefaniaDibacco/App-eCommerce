import Joi from 'joi';

const PASS_RE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const INTER = /^\+[1-9]{1}[0-9]{3,14}$/;

export const userJoiSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  age: Joi.number().required(),
  username: Joi.string().min(3).max(10).required(),
  dir: Joi.string().min(3).max(25).required(),
  cellphone: Joi.string().regex(INTER).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(PASS_RE).required(),
});

export interface NewUserI {
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  dir: string;
  cellphone: string;
  email: string;
  password: string;
}

export interface UserI {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  dir: string;
  cellphone: string;
  email: string;
  password: string;
}

export interface UserQuery {
  username?: string;
  email?: string;
}

export interface UserBaseClass {
  get(id?: string | undefined): Promise<UserI[]>;
  add(data: NewUserI): Promise<UserI>;
  update(id: string, newProductData: NewUserI): Promise<UserI>;
  delete(id: string): Promise<void>;
}
