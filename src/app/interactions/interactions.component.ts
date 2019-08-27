import { Component, OnInit } from '@angular/core';
import { Table } from '../models/table/table.model'
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
  public displayAddTableModal = false;
  public tableSelected = true;
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
    }
  ];
  public seat1 = [
    {
      name: 'Chicken Burger',
      price: 15.99,
      GST: 1.00,
      posCategory: 'Food',
      sent: true,
      GUID: '1234'
    },
    {
      name: 'Lager',
      price: 7.99,
      GST: .50,
      posCategory: 'Drink',
      sent: true,
      GUID: '2341'
    }
  ];
  public seat2 = [
    {
      name: 'Pesto Salad',
      price: 16.99,
      GST: 1.50,
      posCategory: 'Food',
      sent: true,
      GUID: '3412'
    }
  ];

  public table1 = [this.seat1, this.seat2];
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
      // product.GUID = this.newGUID();
      // console.log(product);
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

  // public newGUID(): string {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  // }


  public buildTable(tableName): Table {
    // const formModel = this.form.value;
    const table = {
      id: tableName,
      name: tableName,
      seats: [],
      createdAt: new Date(),
      billPrinted: false,
    };

    return table;
  }

  public addTable(newTableName): void{
    // if (this.tables.indexOf(tableName) === -1){
    //   const tableName = this.buildTable(newTableName);
    //   this.tables.push(tableName);
    // } else {
    //   console.log('sorry theres already a table with that name')
    // }
  }

  public toggleAddTableModal(): void{
    this.displayAddTableModal = !this.displayAddTableModal;
  }
}
