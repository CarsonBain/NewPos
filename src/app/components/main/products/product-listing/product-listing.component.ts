import { OnInit, EventEmitter, Output, Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product/product.model';
import { SeatService } from 'src/app/services/seat/seat.service';
import { Seat } from 'src/app/models/seat/seat.model';
import { TablesService } from 'src/app/services/table/tables.service';
import { Table } from 'src/app/models/table/table.model';

@Component({
  selector: 'app-products-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})

export class ProductsListingComponent {
  @Output() addProductAction = new EventEmitter<Product>();
  @Input() products: Product[] = [];
  public selectedItems = [];
  public openSeat: Seat;
  public openTable: Table;
  public tempSeatItems = [];

  constructor(
    public productService: ProductService,
    public seatService: SeatService,
    public tableService: TablesService
  ) {}

  public addProduct(product: Product): void {
    this.openSeat = this.seatService.getOpenSeat();
    this.openTable = this.tableService.getOpenTable();
    if(this.openSeat) {
      this.tempSeatItems.push(product);
      this.seatService.addItemToSeat(this.openSeat, product);
      this.tableService.getTableItemQuantity(this.openTable);
      this.tableService.getTableSubTotal(this.openTable);
    }
    // if (this.selectedItems.indexOf(product) === -1){
    //   product.selected = true;
    //   product.quantity = 1;
    //   this.selectedItems.push(product);
    // } else {
    //   product.quantity ++;
    // }

    // this.addProductAction.emit(product);
  }

}

