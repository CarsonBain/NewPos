
export class Seat {
  number: number;
  items: [];

  constructor(args: Seat) {
    // super();
    Object.assign(this, args);
  }
}
