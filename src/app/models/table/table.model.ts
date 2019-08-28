import { Seat } from '../seat/seat.model';

export class Table {
  number: number;
  serverId: number;
  seats: Seat[];
  billPrinted: boolean;
  createdAt: string;
  lastItemOrdered: string;
  subtotal?: number;
  totalItems?: number;

  constructor(args: Table) {
    Object.assign(this, args);
  }
}
