
export class Product {
  name: string;
  price: number;
  GST: number;
  posCategory: string;
  GUID: string;

  constructor(args: Product) {
    Object.assign(this, args);
  }
}
