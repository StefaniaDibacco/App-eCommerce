/* eslint-disable no-unused-vars */
import { OrderAtlasDAO } from './DAOs/mongo';
import { Logger } from '../../services/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class OrdenFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Orden Mongo Atlas');
        return new OrderAtlasDAO();

      case TipoPersistencia.LocalMongo:
        Logger.info('Retornando Instancia Orden Mongo Local');
        return new OrderAtlasDAO(true);

      default:
        Logger.info('Retornando Instancia Orden Default');
        return new OrderAtlasDAO();
    }
  }
}
