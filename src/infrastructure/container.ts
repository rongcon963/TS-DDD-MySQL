import { Pool, PoolConnection, Connection } from 'mysql2';
import { TYPES } from '../constants/types';
import config from '../config/main';
import { IDataMapper } from '../core/IDataMapper';
import { IProductRepository } from '../domain/product/IProductRepository';
import { Product } from '../domain/product/Product';
import { AsyncContainerModule, interfaces } from 'inversify';
import { ProductDataMapper } from './dataMapper/ProductDataMapper';
import { createMysqlConnection } from './db/mysql';
import { ProductRepository } from './repositories/ProductRepository';

export const infrastructureContainerModule = new AsyncContainerModule(async(bind: interfaces.Bind) => {
    const db = await createMysqlConnection(config.DB_HOST);
    bind<Connection>(TYPES.Db).toConstantValue(db);
    bind<IDataMapper<Product>>(TYPES.ProductDataMapper).to(ProductDataMapper);
    bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
  });