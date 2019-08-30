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
      name: 'Cab Sauv',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: '',
      SKU: 'sku106',
      selected: false,
      quantity: 0
    },
    {
      name: 'Pinot Noir',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Merlot',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Chard',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Riesling',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Sauv blanc',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Pinot Grigio',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Unoaked Chardonnay',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Wine',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Prosecco',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Steak',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Charcuterie',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
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
    },
    {
      name: 'Fried Pickles',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Pretzels',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Wings',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Cheese Board',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Curly Fries',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Yam Fries',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Duck',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Coke',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Beverage',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Soda',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Beverage',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'N/A Beer',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Beverage',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Event Tickets',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Happy Hour',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
    {
      name: 'Birthday Sundae',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
      GUID: '',
      SKU: 'sku107',
      selected: false,
      quantity: 0
    },
  ];

  public getAll(category?): any {
    console.log(category);
    if (category) {
      const filteredResults = [];
      this.products.forEach(product => {
        if (product.posCategory === category) {
          filteredResults.push(product);
        }
      });
      return filteredResults;
    } else {
      return this.products;
    }
  }
}
