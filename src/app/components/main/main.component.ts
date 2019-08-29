import { Component, Input, } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { Router } from '@angular/router';
import { Table } from 'src/app/models/table/table.model';
import { Seat } from 'src/app/models/seat/seat.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent {
  public products = [];
  public selectedProduct: Product;
  public viewTableSummary = false;
  public tableChange: Table;
  public seatChange: Seat;

  constructor( public router: Router
  ) {}

  public handleAddProduct(product: Product): void {
    this.selectedProduct = product;
  }

  public toggleTableSummary(): void{
    this.viewTableSummary = !this.viewTableSummary;
  }

  public handleTableChange(table: Table): void{
    this.tableChange = table;
  }

  public handleSeatChange(seat: Seat): void{
    this.seatChange = seat;
  }
}

