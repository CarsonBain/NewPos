import { OnInit, EventEmitter, Output, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { Table } from 'src/app/models/table/table.model';
import { TablesService } from 'src/app/services/table/tables.service';
import { FormGroup, FormBuilder, FormControl, FormArray} from '@angular/forms';
import * as html2pdf from 'html2pdf.js';
import { SeatService } from 'src/app/services/seat/seat.service';
import { Seat } from 'src/app/models/seat/seat.model';
import { Product } from 'src/app/models/product/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-summary',
  templateUrl: './table-summary.component.html',
  styleUrls: ['./table-summary.component.scss']
})

export class TableSummaryComponent implements OnChanges, OnInit{
  public tableSummaryTable: Table;
  public billItems = [];
  public billSeats = [];
  public form: FormGroup;
  public displayMoveItemModal = false;
  public billTotal = 0;
  public formSubmitted = false;  
  public seatNumberError = false;
  public displayErrors = false;
  
  constructor(
    public tableService: TablesService,
    public seatService: SeatService,
    private formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef,
    private modalService: NgbModal    
    ){}
  
  @Input() set openTable(table: Table) {
    this.tableSummaryTable = table;
  }
  
  get seatDestination(): FormControl {
    return this.form.get('seatDestination') as FormControl;
  }
  
  public open(content) {
    this.modalService.open(content, { windowClass: 'extra-small' })
  }
  
  public buildBill(): void{
    this.billSeats.forEach(seat => {
      seat.items.forEach((item, index) => {
        this.billTotal += item.price;
        console.log(item);
        if ( seat.billItems.indexOf(item) === -1){
          item.quantity = 1;
          seat.billItems.push(item);
        } else {
          item.quantity ++;
        }
        
        // TO DO : item grouping.
      });
    })

    this.printBill();
  }
  
  public submitMoveItemForm(): void {
    this.formSubmitted = true;
    
    const seatFound = this.tableSummaryTable.seats.filter(seat => {
      return seat.number === this.seatDestination.value;
    });
    
    if (!seatFound.length){
      this.seatNumberError = true;
    }
    
    if(seatFound.length && !this.form.invalid){
      this.modalService.dismissAll();
      this.handleMoveItem();
      this.formSubmitted = true;
    } else if (this.form.invalid || this.seatNumberError) {
      this.displayErrors = true;
    }
  }
  
  public openFindContactField(){
  }
  
  public handleMoveItem(){
    const tempArray = [];
    this.tableSummaryTable.seats.forEach(seat => {
      seat.items.forEach((item, index) => {
        if(item.selected){
          seat.items.splice(index, 1);
          tempArray.push(item);
        };
      });
    });
    
    tempArray.forEach(item => {
      item.seatNumber = this.seatDestination.value;
      item.selected = false;
    });
    
    this.tableSummaryTable.seats.forEach(seat => {
      if (seat.number === this.seatDestination.value){
        seat.items = seat.items.concat(tempArray);
        this.seatService.calculateSubTotal(seat);
      }
    });
  }
  
  public selectItem(item: Product){
    if(item.selected === true){
      item.selected = false;
    } else {
      item.selected = true;
    }
  }
  
  public removeItem(item: Product, seat: Seat){
    this.seatService.removeItemFromSeat(item, seat);
  }
  
  public markSeatAsSelected(seatToMarkActive){
    this.tableSummaryTable.seats.forEach(seat => {
      if (seatToMarkActive === seat) {
        seat.readyForBill = !seat.readyForBill;
        if(seat.readyForBill === true){
          this.billSeats.push(seat);
        }
        if(seat.readyForBill === false){
          this.billSeats.forEach((seat, index) => {
            if(seatToMarkActive === seat){
              this.billSeats.splice(index, 1)
            }
          });
        }
      }
    });
    
    this.billSeats = this.billSeats.sort((t1, t2) => {
      const name1 = t1.number;
      const name2 = t2.number;
      if (name1 > name2) { return 1; }
      if (name1 < name2) { return -1; }
      return 0;
    });
  }
  
  public ngOnInit() {
    this.buildForm();    
  }
  
  
  public ngOnChanges(){
    this.unreadyForBill();
    this.cdr.detectChanges();
    // this.buildCheckboxArray();
  }
  
  private buildForm(): void {
    this.form = this.formBuilder.group({
      seatDestination: '',
    });
  }
  
  private buildCheckboxArray(): FormArray{
    const checkboxArray = [];
    this.tableSummaryTable.seats.forEach((seat, index) => {
     checkboxArray.push(
        false,
      );
    });
    return this.formBuilder.array(checkboxArray);
  }
  
  public unreadyForBill(){
    this.tableSummaryTable.seats.forEach(seat => {
      seat.readyForBill = false;
    });
  }

  public printBill(): void{
    this.cdr.detectChanges();
    setTimeout(() => {
      const element = document.getElementById('receipt');
      html2pdf(element);
    }, 10);
    
    this.unreadyForBill();
  }

}




