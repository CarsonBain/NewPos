import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{
  public products = [];

  constructor(
    public productService: ProductService
  ){};

  public ngOnInit(): void{
    this.getProducts();
  };

  private getProducts(): void{
    this.products = this.productService.getProducts();
  }

  public addProduct(): void{

  }
}

