import Joi from 'joi';

export const productJoiSchema = Joi.object({
  nombre: Joi.string().min(3).max(15).required(),
  descripcion: Joi.string().min(3).max(150).required(),
  categoria: Joi.string().min(3).max(15).required(),
  precio: Joi.number().required(),
  stock: Joi.number().required(),
  fotos: Joi.array().items(Joi.string()),
});

export interface Imagen {
  idImagen: string;
}

export interface newProductI {
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  fotos?: Imagen[];
}

export interface ProductI {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  fotos: Imagen[];
}

export interface ProductQuery {
  nombre?: string;
  categoria?: string;
  precio?: number;
}

export interface ProductBaseClass {
  get(id?: string | undefined): Promise<ProductI[]>;
  add(data: newProductI): Promise<ProductI>;
  update(id: string, newProductData: newProductI): Promise<ProductI>;
  delete(id: string): Promise<void>;
  query(options: ProductQuery): Promise<ProductI[]>;
}
