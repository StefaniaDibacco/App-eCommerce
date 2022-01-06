import { imagenAPI } from '../apis/imagen';
import { Request, Response } from 'express';

class Imagen {
  async getImagen(req: Request, res: Response) {
    const imagenId: any = req.query.id;
    /* TODO validaciones */
    const imagen = await imagenAPI.getImagen(imagenId);
    return res.json(imagen);
  }

  async upload(req: Request, res: Response) {
    const files: any = req.files;
    const { productId } = req.body;
    /* TODO validaciones  */
    const imagen = await imagenAPI.upload({ files, productId });
    return res.json(imagen);
  }

  async deleteImagen(req: Request, res: Response) {
    const imagenId: any = req.query.id;
    const { productId } = req.body;
    /* TODO validaciones */
    const imagen = await imagenAPI.deleteImagen(imagenId, productId);
    return res.json(imagen);
  }
}

export const ImagenController = new Imagen();
