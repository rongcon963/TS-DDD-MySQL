import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
  httpPost,
  httpDelete,
  httpPut,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { ok } from '../processors/response';
import { ProductApplication } from '../../../application/product/ProductApplication';

@controller('/api/v1/products')
export class ProductController {
    constructor(
        @inject(TYPES.ProductApplication)
        private readonly service: ProductApplication
      ) {}

    @httpGet('/')
    async getAllProducts(@request() req: Request, @response() res: Response) {
        const products = await this.service.getAllProducts();
        return res.json(ok(products, 'Successfully retrieved all products'));
    }

    @httpGet('/:id')
    async getProductById(@request() req: Request, @response() res: Response) {
        const product = await this.service.getProductById(req.params.id);
        return res.json(ok(product, `Successfully retrieved a product with an ID of ${req.params.id}`));
    }

    @httpPut('/:id')
    async UpdateProduct(@request() req: Request, @response() res: Response) {
        const { body } = req;
        const product = await this.service.updateProductById(req.params.id, body);
        return res.json(ok(product, `Successfully retrieved a product with an ID of ${req.params.id}`));
    }

    @httpDelete('/:id')
    async deleteProductById(@request() req: Request, @response() res: Response) {
        const product = await this.service.deleteProductById(req.params.id);

        return res.json(ok(product, `Successfully delete a product with an ID of ${req.params.id}`));
    }
    
    @httpPost('/')
    async createProduct(@request() req: Request, @response() res: Response) {
        const { body } = req;
        
        await this.service.createProduct(body);
        return res.json({
        status: '000',
        message: 'Success'
        });
    }

}