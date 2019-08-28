import { Product } from '../product/product.model';

export class Seat {
  number: number;
  items: Product[];

  constructor(args: Seat) {
    // super();
    Object.assign(this, args);
  }
}
