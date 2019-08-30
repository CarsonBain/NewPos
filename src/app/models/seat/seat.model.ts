import { Product } from '../product/product.model';

export class Seat {
  number: number;
  items: Product[];
  subtotal?: number;
  tableNumber: number;
  GUID: string;
  selected: boolean;
  readyForBill: boolean;
  billItems: Product[];

  constructor(args: Seat) {
    Object.assign(this, args);
  }
}
