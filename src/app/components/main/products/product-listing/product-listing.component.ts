import { OnInit, EventEmitter, Output, Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product/product.model';
import { SeatService } from 'src/app/services/seat/seat.service';
import { Seat } from 'src/app/models/seat/seat.model';
import { TablesService } from 'src/app/services/table/tables.service';
import { Table } from 'src/app/models/table/table.model';
import { GUIDService } from 'src/app/services/guid/guid.service';

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
    public tableService: TablesService,
    public guidService: GUIDService
  ) {}

  public addProduct(product: Product): void {
    this.openSeat = this.seatService.getOpenSeat();
    this.openTable = this.tableService.getOpenTable();
    if(this.openSeat) {
      const newProductOptions = {
        name: product.name,
        price: product.price,
        GST: product.GST,
        posCategory: product.posCategory,
        GUID: this.guidService.generateGUID(),
        sku: product.sku,
        selected: product.selected,
        quantity: product.quantity,
        seatNumber: product.seatNumber
      };
      product = new Product(newProductOptions)
      // product.GUID = this.guidService.generateGUID();
      product.seatNumber = this.openSeat.number;
      this.addToTempItems(product);
      this.seatService.addItemToSeat(this.openSeat, product);
      this.tableService.getTableItemQuantity(this.openTable);
      this.tableService.getTableSubTotal(this.openTable);
    } else {
      // this.tableService.createTable({number: 1, seats: 1})
      // console.log('here');
    }
  }
  
  public addToTempItems(product: Product): void{
    const productName = product.name;
    // this.tempSeatItems.forEach(item => {
    //   if(!this.item)
    // });
    // if (!this.tempSeatItems[productName]){
    //   this.tempSeatItems[productName] = {
    //     name : productName,
    //     count: 1
    //   };
    // } else {
    //   this.tempSeatItems[productName].count ++
    // }
  }

}

