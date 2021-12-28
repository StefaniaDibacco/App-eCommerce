import { Schema } from 'mongoose';
// import Joi from 'joi';

/*
Cada documento va a representar un carrito de la DB. 
Los campos que tendrá son los siguientes

⦁	UserId: Referencia al ObjectId del usuario. Debe ser único este campo. Es decir, solo puede existir un carrito por usuario
⦁	Productos: Array de objetos que contendrá la siguiente información
⦁	ObjectId del producto
⦁	Cantidad solicitada
⦁	TimeStamps correspondiente (Fecha de creación, fecha de update)
⦁	Dirección de Entrega: Objeto que tendrá la siguiente información
⦁	Calle (required)
⦁	Altura (required)
⦁	Codigo Postal (required)
⦁	Piso (opcional)
⦁	Departamento (opcional)

validaciones robadas de usuario para tener de ejemplo
const PASS_RE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const INTER = /^\+[1-9]{1}[0-9]{3,14}$/;

export const userJoiSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  age: Joi.number().required(),
  username: Joi.string().min(3).max(10).required(),
  cellphone: Joi.string().regex(INTER).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(PASS_RE).required(),
});
*/
export type productReference = Schema.Types.ObjectId | string;

export interface ProductCart {
  _id: string;
  amount: number;
}

export interface CartI {
  _id: string;
  userId: productReference;
  products: ProductCart[];
}

export interface CartBaseClass {
  get(id: string): Promise<CartI>;
  createCart(userId: string): Promise<CartI>;
  addProduct(cartId: string, product: ProductCart): Promise<CartI>;
  deleteProduct(cartId: string, product: ProductCart): Promise<CartI>;
}
