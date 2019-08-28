import { OnInit, EventEmitter, Output, Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-products-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})

export class ProductsListingComponent implements OnInit {
  public products = [];
  @Output() product = new EventEmitter<Product>();

  constructor(
    public productService: ProductService,
  ) {}

  public ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  public addProduct(product: Product): void {
    console.log(product)
    this.product.emit(product);
  }
}

