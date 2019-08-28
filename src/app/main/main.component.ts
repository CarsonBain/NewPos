import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Product } from '../models/product/product.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent{
  public products = []
  public selectedProduct: Product;

  constructor(
  ){};

  public onAction(product){
    this.selectedProduct = product;
  }

}

