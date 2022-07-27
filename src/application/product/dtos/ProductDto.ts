export class ProductDto {
    constructor(
      public guid: string,
      public name: string,
      public description: string,
      public instockQuantity: number,
      public price: number,
    ) {}
}