import { OnInit, EventEmitter, Output, Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product/product.model';
import { Category } from 'src/app/models/category/category.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  public products = [];
  @Output() action = new EventEmitter<Product>();

  constructor(
    public productService: ProductService
  ) {}

  public ngOnInit(): void {
  }

  public onAction(): void {
    console.log('hit');
  }
}

