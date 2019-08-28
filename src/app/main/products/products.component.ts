import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { ProductService } from '../../product.service';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{
  public products = [];
  @Output() action = new EventEmitter<Product>();

  constructor(
    public productService: ProductService
  ){};

  public ngOnInit(): void{
    this.getProducts();
  };

  private getProducts(): void{
    this.products = this.productService.getProducts();
  }

  public addProduct(product: Product): void{
    this.action.emit(product);
  }
}

