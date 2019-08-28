import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  public categories = [
    {
      name: 'Popular Items'
    },
    {
      name: 'Food'
    },
    {
      name: 'Wine'
    },
    {
      name: 'Beer'
    },
    {
      name: 'Beverage'
    }
  ];

  public getAll(): any {
    return this.categories;
  }
}
