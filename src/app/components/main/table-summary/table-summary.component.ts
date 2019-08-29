import { OnInit, EventEmitter, Output, Component, Input } from '@angular/core';
import { Table } from 'src/app/models/table/table.model';
import { TablesService } from 'src/app/services/table/tables.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-table-summary',
  templateUrl: './table-summary.component.html',
  styleUrls: ['./table-summary.component.scss']
})

export class TableSummaryComponent implements OnInit{
  public tableSummaryTable: Table;
  // public testing: Table;
  
  constructor(public tableService: TablesService){}
  
  public ngOnInit(){
  }
  
  @Input() set openTable(table: Table) {
    this.tableSummaryTable = table;
  }

  public printBill(): void{
    const element = document.getElementById('receipt');
    html2pdf(element);
    // const pdf = new jsPDF('p', 'pt', 'letter');
    // const source = document.getElementById('receipt')
    // const specialElementHandlers = {'#bypassme': function (element, renderer) {
    //   return true
    // }};
    // const margins = {
    //     top: 80,
    //     bottom: 60,
    //     left: 40,
    //     width: 522
    // };
        
    // pdf.fromHTML(source, margins.left, margins.top, {
    //   'width': margins.width,
    //   'elementHandlers': specialElementHandlers
    // },

    // function (dispose) {
    //   pdf.save('Test.pdf');
    // }, margins);
  }

}




