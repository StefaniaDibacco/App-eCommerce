import mongoose from 'mongoose';
import Config from '../../../config/';
import { Logger } from '../../../services/logger';
import { ImagenI, ImagenBaseClass } from '../imagenes.interface';
import path from 'path';
import { productsAPI } from '../../../apis/productos';

export const ImagenSchema = new mongoose.Schema<ImagenI>({
  url: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

export class ImagenAtlasDAO implements ImagenBaseClass {
  private srv: string;
  private Imagenes;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_SRV;
    mongoose.connect(this.srv);
    this.Imagenes = mongoose.model<ImagenI>('imagenes', ImagenSchema);
  }

  async getImagen(id: string): Promise<ImagenI[]> {
    try {
      const imagen: any = await this.Imagenes.find({ _id: id });
      imagen.url = 'localhost:' + Config.PORT + '/files/' + imagen.url;
      return imagen;
    } catch (error) {
      Logger.info('No hay imagenes para mostrar');
      return [];
    }
  }

  async upload(imagenData: any): Promise<ImagenI> {
    const { files, productId } = imagenData;
    if (Object.keys(files).length === 0) {
      throw new Error('No files were uploaded.');
    }
    const timestamp = Date.now();

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const sampleFile = files.foto;
    const ext = path.extname(sampleFile.name);
    if (ext !== 'jpg' && ext !== 'png') {
      throw new Error('No files extension.');
    }
    const name = sampleFile.name.replace(ext, '');

    const nombre = name + '-' + timestamp + ext;
    const uploadPath = path.join(__dirname, '/../../../files/', nombre);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err: any) {
      if (err) throw new Error('Error file uploaded.');
    });

    const imagen = {
      url: nombre,
      timestamp,
    };
    const newImage = new this.Imagenes(imagen);
    const result = await newImage.save();
    const products = await productsAPI.getProducts(productId);
    if (products.length > 0) {
      const fotos = products[0].fotos;
      fotos.push(result._id.toString());
      await productsAPI.updateProduct(productId, { fotos });
    }

    return result;
  }

  async deleteImagen(id: string, productId: string) {
    const result = await this.Imagenes.findByIdAndDelete(id);
    const products = await productsAPI.getProducts(productId);
    if (products.length > 0) {
      let fotos = products[0].fotos;
      fotos = fotos.filter((foto) => foto !== id);
      await productsAPI.updateProduct(productId, { fotos });
    }
    return result;
  }
}
