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
    this.billSeats.forEach(seat => {
      seat.items.forEach(item => {
        if ( seat.billItems.indexOf(item) === -1){
              item.quantity = 1;
              seat.billItems.push(item);
            } else {
              item.quantity ++;
            }
      });
    })
    this.printBill();
  }
  
  public markSeatAsSelected(seatToMarkActive){
    this.tableSummaryTable.seats.forEach(seat => {
      if (seatToMarkActive === seat) {
        seat.selected = !seat.selected;
        if(seat.selected === true){
          this.billSeats.push(seat);
        }
        if(seat.selected === false){
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
  
  // public findSelectedSeats(){
  //   const checkboxValues = this.form.controls.seatCheckboxes.value.value;
  //   checkboxValues.forEach((checkbox,index) => {
  //     if (checkbox === true){
  //       this.tableSummaryTable.seats.forEach(seat => {
  //         if (seat.number === index + 1){
  //           this.billSeats.push(seat);
  //         }
  //       });
  //     }
  //   });
  // }
  
  public ngOnInit() {
    // this.form.get('seatCheckboxes').value.valueChanges.subscribe(newVal => console.log(newVal));
  }
  
  public formSubmit(event) {
    console.log(event)
  }
  
  public ngOnChanges(){
    this.unmarkSelectedSeats();
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
  
  public unmarkSelectedSeats(){
    this.tableSummaryTable.seats.forEach(seat => {
      seat.selected = false;
    });
  }


  public printBill(): void{
    this.cdr.detectChanges();
    setTimeout(() => {
      const element = document.getElementById('receipt');
      html2pdf(element);
    }, 10);
    
    this.unmarkSelectedSeats();
  }

}




