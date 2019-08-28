import { Product } from '../product/product.model';

export class Seat {
  number: number;
  items: Product[];

  constructor(args: Seat) {
    Object.assign(this, args);
  }
}
