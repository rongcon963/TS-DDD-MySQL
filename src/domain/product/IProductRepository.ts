import { IRepository } from '../../core/IRepository';
import { Product } from './Product';

export interface IProductRepository extends IRepository<Product> {}