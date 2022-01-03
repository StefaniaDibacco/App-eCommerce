import mongoose, { Schema } from 'mongoose';
import Config from '../../../config';
import { CartI, ProductCart, CartBaseClass } from '../cart.interface';

export const CartSchema = new mongoose.Schema<CartI>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  productos: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        require: true,
      },
      cantidad: {
        type: Number,
        require: true,
      },
      timeStamps: {
        type: Number,
        require: true,
      },
    },
  ],
  direccion: {
    calle: {
      type: String,
      required: true,
    },
    altura: {
      type: Number,
      require: true,
    },
    codigoPostal: {
      type: Number,
      required: true,
    },
    piso: {
      type: String,
      required: false,
    },
    departamento: {
      type: String,
      required: false,
    },
  },
});

export class CartsAtlasDAO implements CartBaseClass {
  private srv: string;
  private Carts;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_SRV;
    mongoose.connect(this.srv);
    this.Carts = mongoose.model<CartI>('cart', CartSchema);
  }

  async get(userId: string): Promise<CartI> {
    const result = await this.Carts.findOne({ userId });

    if (!result) throw new Error('id not found');

    return result;
  }

  async createCart(userId: string): Promise<CartI> {
    const newCart = new this.Carts({
      userId,
      productos: [],
    });

    await newCart.save();

    return newCart;
  }

  productExist(cart: CartI, productId: string): boolean {
    const index = cart.productos.findIndex(
      (aProduct) => aProduct._id === productId
    );

    if (index < 0) return false;

    return true;
  }

  async addProduct(userId: string, product: ProductCart): Promise<CartI> {
    const cart = await this.Carts.findById(userId);
    if (!cart) throw new Error('Cart not found');

    const index = cart.productos.findIndex((aProduct) => {
      const idMongo: any = aProduct._id.toString();
      const idProdAdd = product._id;
      return idMongo === idProdAdd;
    });

    if (index < 0) cart.productos.push(product);
    else cart.productos[index].cantidad += product.cantidad;

    await cart.save();

    return cart;
  }

  async deleteProduct(cartId: string, product: ProductCart): Promise<CartI> {
    const cart = await this.Carts.findById(cartId);
    if (!cart) throw new Error('Cart not found');

    const index = cart.productos.findIndex((aProduct) => {
      const idMongo: any = aProduct._id.toString();
      const idProdAdd = product._id;
      return idMongo === idProdAdd;
    });

    if (index < 0) throw new Error('Product not found');

    if (cart.productos[index].cantidad <= product.cantidad)
      throw new Error('Product amount invalid');
    else cart.productos[index].cantidad -= product.cantidad;

    await cart.save();
    return cart;
  }
}
