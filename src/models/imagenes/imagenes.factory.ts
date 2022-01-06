/* eslint-disable no-unused-vars */
import { ImagenAtlasDAO } from './DAOs/mongo';
import { Logger } from '../../services/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class ImagenesFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Message Mongo Atlas');
        return new ImagenAtlasDAO();

      case TipoPersistencia.LocalMongo:
        Logger.info('Retornando Instancia Message Mongo Local');
        return new ImagenAtlasDAO(true);

      default:
        Logger.info('Retornando Instancia Message Default');
        return new ImagenAtlasDAO();
    }
  }
}
