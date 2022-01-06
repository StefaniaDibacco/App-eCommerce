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
  private Messages;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_SRV;
    mongoose.connect(this.srv);
    this.Messages = mongoose.model<MensajeI>('messages', MensajeSchema);
  }

  async get() {
    try {
      const mensajes = (await this.Messages.find({})).map((m: any) => ({
        _id: m._id,
        author: m.author,
        text: m.text,
      }));
      return mensajes;
    } catch (error) {
      console.log('No hay mensajes en el listado');
      return [];
    }
  }

  // funcion para agregar mensajes
  async save(data: MensajeI) {
    try {
      const nuevoMensaje = new this.Messages(data);
      const result: any = await nuevoMensaje.save();
      const mensajes = await this.Messages.find({ _id: result._id });
      return mensajes;
    } catch (error) {
      console.log('ERROR: No se pudo agregar un mensaje. ' + error);
    }
  }

  async leerUno(id: any) {
    try {
      return await this.Messages.findOne({ _id: id });
    } catch (error) {
      console.log('ERROR: No se pudo leer un mensaje. ' + error);
    }
  }

  async actualizar(id: any, data: any) {
    try {
      return await this.Messages.updateOne({ _id: id }, { $set: data });
    } catch (error) {
      console.log('ERROR: No se pudo actualizar un mensaje. ' + error);
    }
  }

  async delete(id: any) {
    try {
      return await this.Messages.deleteOne({ _id: id });
    } catch (error) {
      console.log('ERROR: No se pudo actualizar un mensaje. ' + error);
    }
  }
}
