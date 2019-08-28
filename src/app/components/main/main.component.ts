import { Component, } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  public products = [];
  public selectedProduct: Product;

  constructor( public router: Router
  ) {}

  public handleAddProduct(product: Product): void {
    console.log(product)
    this.selectedProduct = product;
  }
}

