/* eslint-disable no-unused-vars */
import { MensajesAtlasDAO } from './DAOs/mongo';
import { Logger } from '../../services/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class MessageFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Message Mongo Atlas');
        return new MensajesAtlasDAO();

      case TipoPersistencia.LocalMongo:
        Logger.info('Retornando Instancia Message Mongo Local');
        return new MensajesAtlasDAO(true);

      default:
        Logger.info('Retornando Instancia Message Default');
        return new MensajesAtlasDAO();
    }
  }
}
