import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category/category.model';

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
    },
    {
      name: 'Red Wine',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: ''
    }
  ];

  public getAll(category?: Category): any {
    if (category) {
      const filteredResults = [];
      this.products.forEach(product => {
        if (product.posCategory === category.name) {
          filteredResults.push(product);
        }
      });
      return filteredResults;
    }
  }
}
