
export class Table {
  number: number;
  serverId: number;
  seats: Array<any>;
  billPrinted: boolean;
  createdAt: string;
  lastItemOrdered: string;

  constructor(args: Table) {
    // super();
    Object.assign(this, args);
  }
}
