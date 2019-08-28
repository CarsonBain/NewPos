
export class Category {
  name: string;

  constructor(args: Category) {
    // super();
    Object.assign(this, args);
  }
}
