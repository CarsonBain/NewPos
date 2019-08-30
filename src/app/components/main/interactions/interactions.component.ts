import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/models/table/table.model'
import { Seat } from 'src/app/models/seat/seat.model'
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/services/table/tables.service';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Product } from 'src/app/models/product/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { SeatService } from 'src/app/services/seat/seat.service';
import { GUIDService } from 'src/app/services/guid/guid.service';

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
  // public tableSelected = true;
  public tableNumberError = false;
  public formSubmitted = false;
  public displayErrors = false;
  @Output() viewTableSummary = new EventEmitter<boolean>();
  @Output() tableChange = new EventEmitter<Table>();
  @Output() seatChange = new EventEmitter<Seat>();

  // public table1 = [this.seat1, this.seat2];
  public serverTables = [];

  constructor(
    private route: ActivatedRoute,
    public tableService: TablesService,
    public seatService: SeatService,
    public guidService: GUIDService,
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
  }

  public setCurrentItem(product: Product, seat: Seat): void{
    this.openSeat = seat;
    this.selectedItem = product;
  }

  public setOpenTable(table: Table): void {
    this.openTable = this.tableService.setOpenTable(table);
    this.openTableSeats = this.openTable.seats;
    if (table) {
    this.tableChange.emit(table);
    }
  }

  public setOpenSeat(seat: Seat): void{
    this.openSeat = this.seatService.setOpenSeat(seat);
    // this.openSeat = seat;
    this.openSeatItems = this.openSeat.items;
    // TODO: don't close other seats
    // Set a value on the seat Modal, open or no.
  }

  public toggleTableSummary(): void{
    this.viewTableSummary.emit();
  }

  public removeSeat(seat: Seat){
    this.seatService.removeSeat(seat, this.openTable);
    // Bug if you delete seat above the open seat, blue doesn't follow open seat.
    // if(seat.number < this.openSeat.number){
    // }
  }

  public open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  public buildTableOptions(): any {
    const seats = [];

    for (let i = 0; i < this.newTableSeats.value; i++){
      const seat: Seat = {
        number: i + 1,
        items: [],
        subtotal: 0.00,
        tableNumber: this.newTableNumber.value,
        GUID: this.guidService.generateGUID(),
        selected: false,
        readyForBill: false,
        billItems: []
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
      const newTable = this.tableService.createTable(tableOptions);
      this.serverTables.push(newTable);

      this.tableNumberError = false;
      this.form.controls.newTableNumber.setValue('');
      this.form.controls.newTableSeats.setValue('1');
      this.toggleAddTableModal();

      // Figure out how to open accordions to do this.
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


// Store new items in a temp array on seat
// Concat the two on send

