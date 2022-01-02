/* eslint-disable no-unused-vars */
import { MensajesAtlasDAO } from './DAOs/mongo';
import { Logger } from '../../services/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class UserFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Users Mongo Atlas');
        return new MensajesAtlasDAO();

      case TipoPersistencia.LocalMongo:
        Logger.info('Retornando Instancia Users Mongo Local');
        return new MensajesAtlasDAO(true);

      default:
        Logger.info('Retornando Instancia Users Default');
        return new MensajesAtlasDAO();
    }
  }
}
