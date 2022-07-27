import { TYPES } from '../../constants/types';
import { IDataMapper } from '../../core/IDataMapper';
import { IProductRepository } from '../../domain/product/IProductRepository';
import { Product } from '../../domain/product/Product';
import { inject } from 'inversify';
import { Pool, Connection } from 'mysql2';
import { Repository } from './Repository';

export class ProductRepository extends Repository<Product> implements IProductRepository {
    constructor(
        @inject(TYPES.Db) private readonly db: Connection,
        @inject(TYPES.ProductDataMapper) private readonly productDataMapper: IDataMapper<Product>
      ) {
        super(db,productDataMapper);
      }
}