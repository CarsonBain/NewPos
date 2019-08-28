import { Component, } from '@angular/core';
import { Product } from '../../models/product/product.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  public products = [];
  public selectedProducts: Product[];

  constructor(
  ) {}

  public handleAddProduct(products: Product[]): void {
    this.selectedProducts = products;
  }
}

