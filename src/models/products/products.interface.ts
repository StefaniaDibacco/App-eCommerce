import Joi from 'joi';

export const productJoiSchema = Joi.object({
  nombre: Joi.string().min(3).max(15).required(),
  descripcion: Joi.string().min(3).max(150).required(),
  categoria: Joi.string().min(3).max(15).required(),
  precio: Joi.number().required(),
  stock: Joi.number().required(),
  fotos: Joi.array().items(Joi.string()),
});

export interface newProductI {
  _id?: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  fotos?: string[];
}

export interface ProductI {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  fotos: string[];
}

export interface ProductQuery {
  nombre?: string;
  categoria?: string;
  precio?: number;
  stock?: number;
  fotos?: string[];
}

export interface ProductBaseClass {
  
  get(id?: string | undefined): Promise<ProductI[]>;
  add(data: newProductI): Promise<ProductI |null>;
  update(id: string, newProductData: ProductQuery): Promise<ProductI | null>;
  delete(id: string): Promise<any>;
  query(options: ProductQuery): Promise<ProductI[]>;
  
}
