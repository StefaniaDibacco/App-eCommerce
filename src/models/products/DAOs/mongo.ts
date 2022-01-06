/* eslint-disable new-cap */
import mongoose from 'mongoose';
import {
  newProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
} from '../products.interface';
import Config from '../../../config';

export const productsSchema = new mongoose.Schema<ProductI>({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  fotos: [{ type: String }],
  stock: {
    type: Number,
    required: true,
  },
});

export class ProductosAtlasDAO implements ProductBaseClass {
  private srv: string;
  private productos;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_SRV;
    mongoose.connect(this.srv);
    this.productos = mongoose.model<ProductI>('producto', productsSchema);
  }

  async get(id?: string): Promise<ProductI[]> {
    let output: ProductI[] = [];
    try {
      if (id) {
        const document = await this.productos.findById(id);
        if (document) output.push(document);
      } else {
        output = await this.productos.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async getAll(ids: any[]): Promise<ProductI[]> {
    try {
      const document = await this.productos.aggregate([
        {
          $match: {
            _id: { $in: ids },
          },
        },
      ]);

      return document;
    } catch (err) {
      return [];
    }
  }

  async add(data: newProductI): Promise<ProductI> {
    if (!data.nombre || !data.precio) throw new Error('invalid data');
    const product: any = await this.productos.findOne({ nombre: data.nombre });
    let newProduct;
    if (product) {
      newProduct = await this.update(product._id, {
        stock: product.stock + data.stock,
      });
    } else {
      newProduct = new this.productos(data);
      await newProduct.save();
    }

    return newProduct;
  }

  async update(id: string, newProductData: ProductQuery): Promise<ProductI> {
    return await this.productos.findByIdAndUpdate(id, newProductData);
  }

  async delete(id: string) {
    return await this.productos.findByIdAndDelete(id);
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    const query: ProductQuery = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.categoria) query.categoria = options.categoria;

    if (options.precio) query.precio = options.precio;

    return await this.productos.find(query);
  }
}
