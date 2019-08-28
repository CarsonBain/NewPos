import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  public products = [
    {
      name: 'Caeser Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: ''
    },
    {
      name: 'Green Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: ''
    },
    {
      name: 'Chicken Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: ''
    },
    {
      name: 'Chickpea Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: ''
    },
    {
      name: 'Salmon Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: ''
    }
  ];

  public getProducts(): any {
    return this.products;
  }
}
