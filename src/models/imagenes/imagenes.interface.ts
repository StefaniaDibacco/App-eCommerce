/* eslint-disable no-unused-vars */
import Joi from 'joi';

export const ImagenJoiSchema = Joi.object({
  url: Joi.string().required(),
  timestamp: Joi.number().required(),
});

export interface ImagenI {
  url: string;
  timestamp: number;
}

export interface ImagenBaseClass {
  /* get(id?: string | undefined): Promise<UserI[]>;
  add(data: NewUserI): Promise<UserI>;
  update(id: string, newProductData: NewUserI): Promise<UserI>;
  delete(id: string): Promise<void>; */
}
