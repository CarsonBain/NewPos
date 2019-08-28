import { Seat } from '../seat/seat.model';

export class Table {
  number: number;
  serverId: number;
  seats: Seat[];
  billPrinted: boolean;
  createdAt: string;
  lastItemOrdered: string;

  constructor(args: Table) {
    // super();
    Object.assign(this, args);
  }
}
