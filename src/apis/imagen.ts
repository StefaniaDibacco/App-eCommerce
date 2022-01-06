import {
  ImagenI,
  ImagenBaseClass,
} from '../models/imagenes/imagenes.interface';
import {
  ImagenesFactoryDAO,
  TipoPersistencia,
} from '../models/imagenes/imagenes.factory';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.LocalMongo;

class ImagenAPI implements ImagenBaseClass {
  private imagenes;

  constructor() {
    this.imagenes = ImagenesFactoryDAO.get(tipo);
  }

  async getImagen(id: string): Promise<ImagenI[]> {
    return await this.imagenes.getImagen(id);
  }

  async upload(productData: any): Promise<ImagenI> {
    const newImagen = await this.imagenes.upload(productData);
    return newImagen;
  }

  async deleteImagen(id: string, productId: string) {
    return await this.imagenes.deleteImagen(id, productId);
  }
}

// eslint-disable-next-line new-cap
export const imagenAPI = new ImagenAPI();
