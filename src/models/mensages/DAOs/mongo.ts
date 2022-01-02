import mongoose from 'mongoose';
import { MensajeI, MensajesBaseClass } from '../messages.interface';
import Config from '../../../config';

export const MensajeSchema = new mongoose.Schema<MensajeI>({
  userId: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
});

export class MensajesAtlasDAO implements MensajesBaseClass {
  private srv: string;
  private productos;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_SRV;
    mongoose.connect(this.srv);
    this.productos = mongoose.model<MensajeI>('producto', MensajeSchema);
  }
}
