/* eslint-disable no-unused-vars */
import { CartsAtlasDAO } from './DAOs/mongo';
import { Logger } from '../../services/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class CartFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Cart Mongo Atlas');
        return new CartsAtlasDAO();

      case TipoPersistencia.LocalMongo:
        Logger.info('Retornando Instancia Cart Mongo Local');
        return new CartsAtlasDAO(true);

      default:
        Logger.info('Retornando Instancia Cart Default');
        return new CartsAtlasDAO();
    }
  }
}
