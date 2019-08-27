import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.scss']
})

export class InteractionsComponent {
  public currentTable;
  public currentSeat;
  public currentProduct;
  public products = [
    {
      name: 'Caeser Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food'
    },
    {
      name: 'Green Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food'
    }
  ]
  public seat1 = [
    {
      name: 'Chicken Burger',
      price: 15.99,
      GST: 1.00,
      posCategory: 'Food'
    },
    {
      name: 'Lager',
      price: 7.99,
      GST: .50,
      posCategory: 'Drink'
    }
  ]
  public seat2 = [
    {
      name: 'Pesto Salad',
      price: 16.99,
      GST: 1.50,
      posCategory: 'Food'
    }
  ]

  public table1 = [this.seat1, this.seat2]


  constructor() {
  }

  public addItem(product): void{
    // Move Logic elsewhere to dropdown
    this.currentTable = this.table1;
    this.currentSeat = this.seat1;

    this.currentSeat.push(product);
  }

  public setCurrentItem(product): void{
    this.currentProduct = product;
  }
}
