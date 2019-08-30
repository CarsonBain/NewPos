import { Product } from '../product/product.model';

export class Contact {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  clubMembership?: string;
  birthdate?: Date;
  lastVisit?: Date;
  top3: Product[];

  constructor(args: Contact) {
    Object.assign(this, args);
  }
}
