import { Component, } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { Router } from '@angular/router';
import { Table } from 'src/app/models/table/table.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  public products = [];
  public selectedProduct: Product;
  public viewTableSummary = false;

  constructor( public router: Router
  ) {}

  public handleAddProduct(product: Product): void {
    this.selectedProduct = product;
  }

  public toggleTableSummary(): void{
    this.viewTableSummary = !this.viewTableSummary;
  }
}

