import { OnInit, EventEmitter, Output, Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product/product.model';
import { Table } from 'src/app/models/table/table.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{
  public products = [];
  @Output() addProductAction = new EventEmitter<Product>();
  // @Input() set currentTable(table) {
  //   if (table) {
  //   this.openTable = table;
  //   console.log(table);
  //   }
  // };

  public openTable: Table;

  constructor(public productService: ProductService) {}

  public ngOnInit(): void {
    this.products = this.productService.getAll({name : 'Popular Items'});
  }

  public filterProducts(event): void {
    this.products = [];
    this.products = event;
  }

  public addProduct(product): void {
    // console.log('product component ,', products);
    this.addProductAction.emit(product);
  }
}
