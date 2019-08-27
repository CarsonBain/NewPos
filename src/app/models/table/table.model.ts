
export class Table {
  number: number;
  serverId: number;
  seats: Array<any>;
  billPrinted: boolean;
  createdAt: Date;
  lastItemOrdered: Date;

  constructor(args: Table) {
    // super();
    Object.assign(this, args);
  }
}
