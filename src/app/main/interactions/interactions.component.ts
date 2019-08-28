import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { Table } from '../../models/table/table.model'
import { Seat } from '../../models/seat/seat.model'
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/tables.service';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.scss']
})

export class InteractionsComponent implements OnInit{
  @ViewChild('newTableNumber') tableNumberField: ElementRef;

  get newTableNumber(): FormControl {
    return this.form.get('newTableNumber') as FormControl;
  }

  get newTableSeats(): FormControl {
    return this.form.get('newTableSeats') as FormControl;
  }

  // @Input() productAdd: Product;
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
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.buildForm();
    // this.getProducts();
    // this.getTablesForServer();
  }

  private getTablesForServer(): void {
    const activatedServerId = +this.route.snapshot.paramMap.get('id');
    this.tableService.getServerTables(activatedServerId).forEach(table => {
      this.serverTables.push(table);
    });
  }

@Input() set productAdd(product: Product) {
  if(this.openSeat){
    console.log('hi')
    this.openSeat.items.push(product);
  }
}

  public addItem(product): void {
    // Move Logic elsewhere to dropdown
    // this.openTable = this.table1;
    // this.openSeat = this.seat1;

    if (this.openSeat) {
      // product.GUID = this.newGUID();
      // this.openSeat.push(product);
      // this.openSeat.items.push(product);
    }
  }

  public setCurrentItem(product, seat): void{
    // console.log(product, seat)
    this.openSeat = seat;
    this.selectedItem = product;
  };

  public setOpenTable(table): void{
    this.openTable = table;
    this.openTableSeats = this.openTable.seats;
    // close other tables
  };

  public setOpenSeat(seat): void{
    this.openSeat = seat;
    this.openSeatItems = this.openSeat.items;
    console.log(this.openSeatItems);
    // don't close other seats
  }

  public removeProduct(): void {
  }

  // public newGUID(): string {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  //     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  // }


  public buildTable(tableOptions): Table {
    const table = {
      number: tableOptions.number,
      serverId: this.currentServer,
      seats: tableOptions.seats,
      billPrinted: false,
      createdAt: new Date(),
      lastItemOrdered: new Date(),
    };

    return table;
  }

  public onAction(): void {
    console.log('hi')
  };

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
      const newTable = this.buildTable(tableOptions);
      this.serverTables.push(newTable);

      // Make this validation better
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
