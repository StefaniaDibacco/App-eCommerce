/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { ProductosFSDAO } from './DAOs/fs';
import { ProductosAtlasDAO } from './DAOs/mongo';
import { Logger } from '../../services/logger';
import path from 'path';

export enum TipoPersistencia {
  FileSystem = 'FS',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class NoticiasFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.FileSystem:
        Logger.info('Retornando Instancia Products FS');
        const filePath = path.resolve(__dirname, '../../DAOs/productos.json');
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.MongoAtlas:
        Logger.info('Retornando Instancia Products Mongo Atlas');
        return new ProductosAtlasDAO();

      case TipoPersistencia.LocalMongo:
        Logger.info('Retornando Instancia Products Mongo Local');
        return new ProductosAtlasDAO(true);

      default:
        Logger.info('Retornando Instancia Products Default');
        return new ProductosAtlasDAO();
    }
  }
}
