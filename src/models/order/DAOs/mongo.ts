import mongoose, { Schema } from 'mongoose';
import { productsAPI } from '../../../apis/productos';
import Config from '../../../config';
import { CartI } from '../../carts/cart.interface';
import { OrdenI, OrdenBaseClass, NewOrden, ItemsI } from '../order.interface';

const OrderSchema = new mongoose.Schema<OrdenI>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  items: [
    {
      productId: {
        type: String,
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
    const productosBuscados: any[] = await productsAPI.getAllProducts(
      productIds
    );

    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const productoBuscado = productosBuscados.find((pb) => {
        const idPb = pb._id.toString();
        const idProd = producto._id.toString();
        return idPb === idProd;
      });
      if (productoBuscado) productos[i].precio = productoBuscado.precio;
    }
    /** obtengo el total de la orden */
    const total = productosBuscados
      .map((prod) => prod.precio)
      .reduce((a, b) => a + b, 0);

    const items: ItemsI[] = productos.map((prod) => {
      // @ts-ignore: Object is possibly 'null'.
      const precioUnitario = prod.precio | 1;
      return {
        productId: prod._id.toString(),
        cantidad: prod.cantidad,
        precio: precioUnitario * prod.cantidad,
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

  async getOrder(userId: string, orderId: string | undefined) {
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
    const ordenUpdate: OrdenI| null = await this.Order.findOneAndUpdate(
      { _id: orderId },
      { estado: 'Compledata' }
    );
    /* TODO Mandar mail */
    return ordenUpdate;
  }
}
