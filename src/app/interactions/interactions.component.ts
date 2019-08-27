import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/tables.service';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.scss']
})

export class InteractionsComponent implements OnInit{
  public currentTable;
  public currentSeat;
  public currentItem;
  public products = [
    {
      name: 'Caeser Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
    },
    {
      name: 'Green Salad',
      price: 7.99,
      GST: 1.00,
      posCategory: 'Food',
    }
  ];
  public seat1 = [
    {
      name: 'Chicken Burger',
      price: 15.99,
      GST: 1.00,
      posCategory: 'Food',
      sent: true
    },
    {
      name: 'Lager',
      price: 7.99,
      GST: .50,
      posCategory: 'Drink',
      sent: true
    }
  ];
  public seat2 = [
    {
      name: 'Pesto Salad',
      price: 16.99,
      GST: 1.50,
      posCategory: 'Food',
      sent: true
    }
  ]

  public table1 = [this.seat1, this.seat2];
  public tables = [this.table1];
  public serverTables = [];


  constructor(private route: ActivatedRoute, public tableService: TablesService) {
  }

  ngOnInit() {
    const activatedServerId = +this.route.snapshot.paramMap.get('id');
    this.tableService.getServerTables(activatedServerId).forEach(table => {
      this.serverTables.push(table);
    });
    console.log(this.serverTables);

  }

  public addItem(product): void {
    // Move Logic elsewhere to dropdown
    // this.currentTable = this.table1;
    // this.currentSeat = this.seat1;

    if(this.currentSeat){
      product.GUID = this.newGUID();
      this.currentSeat.push(product);
    }
  }

  public setCurrentItem(product, seat): void{
    this.currentSeat = seat;
    // set the current seat to the seat with this product
    this.currentItem = product;
  };

  public setCurrentTable(table): void{
    this.currentTable = table;
  };

  public setCurrentSeat(seat): void{
    this.currentSeat = seat;
  }

  public removeProduct(): void {
  }

  public newGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
