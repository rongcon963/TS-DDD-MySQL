import { injectable, inject } from 'inversify';
import { TYPES } from '../../constants/types';
import { ApplicationError } from '../../core/ApplicationError';
import { IProductRepository } from '../../domain/product/IProductRepository';
import { ProductDto } from './dtos/ProductDto';
import { Product } from '../../domain/product/Product';

@injectable()
export class ProductApplication {
    constructor(
        @inject(TYPES.ProductRepository)
        private readonly productRepository: IProductRepository,
    ) {}

    async getAllProducts(): Promise<any[]> {
        const products = await this.productRepository.findAll();
        return products.map(product => new ProductDto(product.guid, product.name ,product.description, product.instockQuantity, product.price));
    }

    async getProductById(id: string): Promise<any | null> {
        const product = await this.productRepository.findOneById(id);
        if (!product) throw new ApplicationError('404', 404, 'The user with the requested ID does not exist');
        return new ProductDto(product.guid, product.name ,product.description, product.instockQuantity, product.price);
    }

    async createProduct({ name, description, instockQuantity, price }: any): Promise<void> {
        const product = Product.create({ name, description, instockQuantity, price });
        console.log(product);
        
        await this.productRepository.save(product);
    }

    async updateUserById(id: string,{ name, description, instockQuantity, price }: any ): Promise<void> {
        const product = await this.productRepository.findOneById(id);
        if (!product) throw 'Product not found';
        
        // copy userParam properties to user
        Object.assign(product, { name, description, instockQuantity, price });

        await this.productRepository.save(product);
    }

    async deleteUserById(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }
}
