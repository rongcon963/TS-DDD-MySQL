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
        const books = await this.service.getAllProducts();
        return res.json(ok(books, 'Successfully retrieved all users'));
    }

    @httpGet('/:id')
    async getProductById(@request() req: Request, @response() res: Response) {
        const user = await this.service.getProductById(req.params.id);
        return res.json(ok(user, `Successfully retrieved a user with an ID of ${req.params.id}`));
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