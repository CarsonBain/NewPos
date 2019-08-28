import { Product } from '../product/product.model';

export class Seat {
  number: number;
  items: Product[];
  subtotal?: number;

  constructor(args: Seat) {
    Object.assign(this, args);
  }
}
