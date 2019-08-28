import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table/table.model'
import { Seat } from 'src/app/models/seat/seat.model'
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/services/table/tables.service';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Product } from 'src/app/models/product/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.scss']
})

export class InteractionsComponent implements OnInit {

  get newTableNumber(): FormControl {
    return this.form.get('newTableNumber') as FormControl;
  }

  get newTableSeats(): FormControl {
    return this.form.get('newTableSeats') as FormControl;
  }

  public openTable: Table;
  public openTableSeats: Seat[] = [];
  public openSeatItems: Product[] = [];
  public openSeat: Seat;
  public selectedItem: Product;
  public form: FormGroup;
  public currentServer = 1;
  public displayAddTableModal = false;
  public tableSelected = true;
  public tableNumberError = false;

  public seat1 = {
    items : [{
      name: 'Chicken Burger',
      price: 15.99,
      GST: 1.00,
      posCategory: 'Food',
      sent: true,
      GUID: '1234'
    },
    {
      name: 'Lager',
      price: 7.99,
      GST: .50,
      posCategory: 'Drink',
      sent: true,
      GUID: '2341'
    }]
  };
  public seat2 = {
    items : [{
      name: 'Pesto Salad',
      price: 16.99,
      GST: 1.50,
      posCategory: 'Food',
      sent: true,
      GUID: '3412'
    }]
  };

  public table1 = [this.seat1, this.seat2];
  public serverTables = [];

  constructor(
    private route: ActivatedRoute,
    public tableService: TablesService,
    // public productService: ProductService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
    ) {}

  ngOnInit() {
    this.buildForm();
    // this.getTablesForServer();
  }

  private getTablesForServer(): void {
    const activatedServerId = +this.route.snapshot.paramMap.get('id');
    this.tableService.getServerTables(activatedServerId).forEach(table => {
      this.serverTables.push(table);
    });
  }

  // TODO: Find some way of adding two in a row
  @Input() set productAdd(product: Product) {
    if (this.openSeat) {
      product.GUID = this.newGUID();
      this.openSeat.items.push(product);
      console.log(this.openSeat)
      console.log(this.openSeatItems)
    }
  }

  // public addItem(product): void {
  //   // Move Logic elsewhere to dropdown
  //   // this.openTable = this.table1;
  //   // this.openSeat = this.seat1;

  //   if (this.openSeat) {
  //     // product.GUID = this.newGUID();
  //     // this.openSeat.push(product);
  //     // this.openSeat.items.push(product);
  //   }
  // }

  public setCurrentItem(product: Product, seat: Seat): void{
    this.openSeat = seat;
    console.log(product);
    this.selectedItem = product;
  }

  public setOpenTable(table: Table): void{
    this.openTable = table;
    this.openTableSeats = this.openTable.seats;
    // close other tables
  }

  public setOpenSeat(seat: Seat): void{
    this.openSeat = seat;
    this.openSeatItems = this.openSeat.items;
    console.log(this.openSeatItems);
    // TODO: don't close other seats
    // Set a value on the seat Modal, open or no.
  }

  public open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  public removeProduct(): void {
  }

  public newGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  public buildTable(tableOptions): Table {
    const table = {
      number: tableOptions.number,
      serverId: this.currentServer,
      seats: tableOptions.seats,
      billPrinted: false,
      createdAt: new Date().toLocaleTimeString(),
      lastItemOrdered: new Date().toLocaleTimeString(),
    };

    return table;
  }

  public onAction(): void {
  }

  public buildTableOptions(): any{
    const seats = [];

    for (let i = 0; i < this.newTableSeats.value; i++){
      const seat = {
        number: i + 1,
        items: []
      };
      seats.push(seat);
    }
    const tableOptions = {
      number: this.newTableNumber.value,
      seats
    };

    return tableOptions;
  }

  public submitTableForm(): void{
    const tableOptions = this.buildTableOptions();

    const tableFound = this.serverTables.filter(table => {
      return table.number === this.newTableNumber.value;
    });

    if (tableFound.length === 0){
      this.modalService.dismissAll();
      const newTable = this.buildTable(tableOptions);
      this.serverTables.push(newTable);

      // TODO: Make this validation better
      this.tableNumberError = false;
      this.form.controls.newTableNumber.setValue('');
      this.form.controls.newTableSeats.setValue('');
      this.toggleAddTableModal();
      //

      this.setOpenTable(newTable);
      this.setOpenSeat(this.openTable.seats[0])
    } else {
      this.tableNumberError = true;
      this.form.controls.newTableNumber.setValue('');
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      newTableNumber: '',
      newTableSeats: ''
    });
  }

  public toggleAddTableModal(): void{
    this.displayAddTableModal = !this.displayAddTableModal;
  }
}
