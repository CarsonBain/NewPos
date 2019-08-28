import { OnInit, EventEmitter, Output, Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-products-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})

export class ProductsListingComponent {
  @Output() addProductAction = new EventEmitter<Product>();
  @Input() products: Product[] = [];

  constructor(
    public productService: ProductService,
  ) {}

  public addProduct(product: Product): void {
    this.addProductAction.emit(product);
  }
}

