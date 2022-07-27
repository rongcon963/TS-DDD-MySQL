import { injectable } from 'inversify';
import { IDataMapper } from '../../core/IDataMapper';
import { Product } from '../../domain/product/Product';

@injectable()
export class ProductDataMapper implements IDataMapper<Product> {
  toDomain(product: any) {
    const {
      guid,
      name,
      description,
      instockQuantity,
      price,
    } = product;
    return Product.create({ name, description, instockQuantity, price }, guid);
  }

  toDalEntity(productEntity: Product) {
    return {
      guid: productEntity.guid,
      name: productEntity.name,
      description: productEntity.description,
      instockQuantity: productEntity.instockQuantity,
      price: productEntity.price,
    };
  }
}