import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/models/table/table.model'
import { Seat } from 'src/app/models/seat/seat.model'
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/services/table/tables.service';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Product } from 'src/app/models/product/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { SeatService } from 'src/app/services/seat/seat.service';

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
  public formSubmitted = false;
  public displayErrors = false;

  // public table1 = [this.seat1, this.seat2];
  public serverTables = [];

  constructor(
    private route: ActivatedRoute,
    public tableService: TablesService,
    public seatService: SeatService,
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
      this.seatService.addItemToSeat(this.openSeat, product);
      this.tableService.getTableItemQuantity(this.openTable);
      this.tableService.getTableSubTotal(this.openTable);
    }
  }

  public setCurrentItem(product: Product, seat: Seat): void{
    this.openSeat = seat;
    console.log(product);
    this.selectedItem = product;
  }

  public setOpenTable(table: Table): void {
    this.openTable = table;
    this.openTableSeats = this.openTable.seats;
    // close other tables
  }

  public setOpenSeat(seat: Seat): void{
    this.openSeat = seat;
    this.openSeatItems = this.openSeat.items;
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
      totalItems: 0,
      subtotal: 0
    };

    return table;
  }

  public onAction(): void {
  }

  public buildTableOptions(): any {
    const seats = [];

    for (let i = 0; i < this.newTableSeats.value; i++){
      const seat = {
        number: i + 1,
        items: [],
        subtotal: 0.00
      };
      seats.push(seat);
    }
    const tableOptions = {
      number: this.newTableNumber.value,
      seats
    };

    return tableOptions;
  }

  public submitTableForm(): void {
    this.formSubmitted = true;
    const tableOptions = this.buildTableOptions();

    const tableFound = this.serverTables.filter(table => {
      return table.number === this.newTableNumber.value;
    });

    if (tableFound.length) {
      this.tableNumberError = true;
    }

    if (tableFound.length === 0 && !this.form.invalid ){
      this.modalService.dismissAll();
      const newTable = this.buildTable(tableOptions);
      this.serverTables.push(newTable);

      // TODO: Make this validation better
      this.tableNumberError = false;
      this.form.controls.newTableNumber.setValue('');
      this.form.controls.newTableSeats.setValue('1');
      this.toggleAddTableModal();
      //

      this.setOpenTable(newTable);
      this.setOpenSeat(this.openTable.seats[0]);
      this.formSubmitted = false;
    } else if (this.form.invalid || this.tableNumberError) {
      this.displayErrors = true;
    }
  }

  public addSeat(table: Table): void {
    this.seatService.addSeat(table);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      newTableNumber: ['', Validators.required],
      newTableSeats: ['1', Validators.minLength(1)]
    });
  }

  public toggleAddTableModal(): void {
    this.displayAddTableModal = !this.displayAddTableModal;
  }
}

