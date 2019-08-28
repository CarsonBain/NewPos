
export class Product {
  name: string;
  price: number;
  GST: number;
  posCategory: string;
  GUID: string;
  sku: string;
  selected: boolean;
  quantity: number;

  constructor(args: Product) {
    Object.assign(this, args);
  }
}
