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
      GUID: '',
      SKU: 'sku101',
      selected: false,
      quantity: 0
    },
    {
      name: 'Green Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: '',
      SKU: 'sku102',
      selected: false,
      quantity: 0
    },
    {
      name: 'Chicken Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: '',
      SKU: 'sku103',
      selected: false,
      quantity: 0
    },
    {
      name: 'Chickpea Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: '',
      SKU: 'sku104',
      selected: false,
      quantity: 0
    },
    {
      name: 'Salmon Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: '',
      SKU: 'sku105',
      selected: false,
      quantity: 0
    },
    {
      name: 'Red Wine',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: '',
      SKU: 'sku106',
      selected: false,
      quantity: 0
    },
    {
      name: 'Champs',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
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
    } else {
      return this.products;
    }
  }
}
