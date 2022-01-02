import mongoose, { Schema } from 'mongoose';
import Config from '../../../config';
import { OrdenI, OrdenBaseClass } from '../order.interface';

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
    this.Order = mongoose.model<OrdenI>('cart', OrderSchema);
  }
}
