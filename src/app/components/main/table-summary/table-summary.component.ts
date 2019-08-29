import { OnInit, EventEmitter, Output, Component, Input } from '@angular/core';
import { Table } from 'src/app/models/table/table.model';
import { TablesService } from 'src/app/services/table/tables.service';

@Component({
  selector: 'app-table-summary',
  templateUrl: './table-summary.component.html',
  styleUrls: ['./table-summary.component.scss']
})

export class TableSummaryComponent implements OnInit{
  public openTable: Table;
  public selectedItems = [];
  
  constructor(public tableService: TablesService){}
  
  public ngOnInit(){
    this.openTable = this.tableService.getOpenTable();
  }
  
  public selectItem(item){
    this.selectedItems.push(item);
    console.log(this.selectedItems);
  }
  
}

