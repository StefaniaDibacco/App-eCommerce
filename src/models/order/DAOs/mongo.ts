import mongoose, { Schema } from 'mongoose';
import Config from '../../../config';
import { CartI } from '../../carts/cart.interface';
import { ProductI } from '../../products/products.interface';
import { OrdenI, OrdenBaseClass, NewOrden, ItemsI } from '../order.interface';

const OrderSchema = new mongoose.Schema<OrdenI>({
  _id: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: Number,
        require: true,
      },
      cantidad: {
        type: Number,
        require: true,
      },
      precio: {
        type: Number,
        required: true,
      },
    },
  ],
  timeStamp: {
    type: Number,
    require: true,
  },
  estado: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: false,
  },
});

export class OrderAtlasDAO implements OrdenBaseClass {
  private srv: string;
  private Order;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_SRV;
    mongoose.connect(this.srv);
    this.Order = mongoose.model<OrdenI>('orders', OrderSchema);
  }

  async createOrder(carrito: CartI) {
    const { userId, productos } = carrito;

    /* buscar los productos desde su id */
    const productIds = productos.map((prod) => prod._id);
    /* obtengo los productos */
    const productosBuscados: any[] = await this.Order.find({
      _id: { $in: productIds },
    });

    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const productoBuscado = productosBuscados.find(
        (pb) => pb._id === producto._id
      );
      if (productoBuscado) productos[i].precio = productoBuscado.precio;
    }
    /** obtengo el total de la orden */
    const total = productosBuscados
      .map((prod) => prod.precio)
      .reduce((a, b) => a + b, 0);

    const items: ItemsI[] = productos.map((prod) => {
      return {
        productId: prod._id,
        cantidad: prod.cantidad,
        precio: prod.precio,
      };
    });

    const orden: NewOrden = {
      userId: userId,
      items,
      timeStamp: Date.now(),
      estado: 'Generado',
      total,
    };

    const newOrden = new this.Order(orden);
    return await newOrden.save();
  }

  async getOrders(userId: string, orderId: string) {
    let query = {};
    if (!orderId) {
      query = { userId };
    } else {
      query = { userId, _id: orderId };
    }
    return await this.Order.find(query);
  }
  // eslint-disable-next-line lines-between-class-members
  async completeOrder(orderId: string) {
    const orden = await this.Order.findOne({ _id: orderId });
    /* si no existe la orden */
    if (!orden) throw new Error('Orden dont exist');
    if (orden.estado !== 'Generada') throw new Error('Orden no generada');
    const ordenUpdate = await this.Order.updateOne(
      { _id: orderId },
      { estado: 'Compledata' }
    );
    /* Mandar mail */
    return ordenUpdate;
  }
}
