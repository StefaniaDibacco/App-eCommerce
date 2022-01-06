import {
  MessageFactoryDAO,
  TipoPersistencia,
} from '../models/mensages/messages.factory';
import { MensajeI } from '../models/mensages/messages.interface';

export const formatMessages = (data: any): MensajeI => {
  const { userId, firstName, tipo, mensaje } = data;
  return {
    userId,
    firstName,
    tipo,
    mensaje,
  };
};

const tipo = TipoPersistencia.LocalMongo;

class Mensajes {
  private Message;

  constructor() {
    this.Message = MessageFactoryDAO.get(tipo);
  }

  async save(data: MensajeI) {
    return await this.Message.save(data);
  }

  async get() {
    return await this.Message.get();
  }
}

export const messageApi = new Mensajes();
