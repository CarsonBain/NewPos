import { OnInit, EventEmitter, Output, ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { Table } from 'src/app/models/table/table.model';
import { TablesService } from 'src/app/services/table/tables.service';
import { FormGroup, FormBuilder, FormControl, FormArray} from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as html2pdf from 'html2pdf.js';

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
  // public checkboxArray = [];
  
  constructor(
    public tableService: TablesService,
    private formBuilder: FormBuilder,
    public cdr: ChangeDetectorRef
    ){}
  
  @Input() set openTable(table: Table) {
    this.tableSummaryTable = table;
  }
  
  get seatCheckboxes() {
    return this.form.get('seatCheckboxes');
  }
  
  public buildBill(): void{
    this.findSelectedSeats();
    console.log('billSeats, ', this.billSeats);
    this.tableSummaryTable.seats.forEach(seat => {
      seat.items.forEach(item => {
        if ( this.billItems.indexOf(item) === -1){
          item.quantity = 1;
          this.billItems.push(item);
        } else {
          item.quantity ++;
        }
      });
    });
    
    this.printBill();
  }
  
  public findSelectedSeats(){
    const checkboxValues = this.form.controls.seatCheckboxes.value.value;
    checkboxValues.forEach((checkbox,index) => {
      if (checkbox === true){
        this.tableSummaryTable.seats.forEach(seat => {
          if (seat.number === index + 1){
            this.billSeats.push(seat);
          }
        });
      }
    });
  }
  
  public ngOnInit() {
    // this.form.get('seatCheckboxes').value.valueChanges.subscribe(newVal => console.log(newVal));
  }
  
  public ngOnChanges(){
    this.buildCheckboxArray();
    this.buildForm();
    // this.monitorCheckboxes();
    // this.form.get('seatCheckboxes').value.valueChanges.subscribe(this.seatCheckboxes = results);
  }
  
  // private monitorCheckboxes(): void {
  //   this.seatCheckboxes.valueChanges.subscribe(results => {
  //     this.seatCheckboxes = results;
  //   });
  // }
  
  private buildForm(): void {
    this.form = this.formBuilder.group({
      seatCheckboxes: [this.buildCheckboxArray()],
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
    // console.log(this.checkboxArray)
  }
  
  // private buildDefaultCheckboxes() {
  //   const arr = this.checkboxArray.map(box => {
  //     return this.formBuilder.control(box.checked);
  //   });
  //   return this.formBuilder.array(arr);
  // }


  public printBill(): void{
    this.cdr.detectChanges();
    setTimeout(() => {
      const element = document.getElementById('receipt');
      html2pdf(element);
    }, 10);
  }

}




