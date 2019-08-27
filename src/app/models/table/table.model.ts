
export class Table {
  name: string;
  seats: Array<any>;
  id: string;
  createdAt: Date;
  billPrinted: boolean;

  constructor(args: Table) {
    // super();
    Object.assign(this, args);
  }
}
