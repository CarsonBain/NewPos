import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { Table } from 'src/app/models/table/table.model';
import { Seat } from 'src/app/models/seat/seat.model';
import { GUIDService } from 'src/app/services/guid/guid.service'
@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(public GuidService: GUIDService) { }

  public seats: Seat[] = [];
  public openSeat: Seat;

  public getTableSeats(tableNo: number) {
    const tableSeats = this.seats.filter(seat => {
      return seat.tableNumber === tableNo;
    });

    return tableSeats;
  }

  public addSeat(table: Table): void {
    const newSeat = {
      number: table.seats.length + 1,
      items: [],
      subtotal: 0.00,
      tableNumber: table.number,
      GUID: this.GuidService.generateGUID(),
      selected: false,
      readyForBill: false,
      billItems: [],
    };
    table.seats.push(newSeat);
  }
  
  public removeSeat(seatToRemove: Seat, table: Table): void{
    table.seats.forEach((seat, index) => {
      if(seatToRemove.GUID === seat.GUID){
        table.seats.splice(index, 1);
      }
    });
    this.correctSeatNumbers(table);
  }
  
  public removeItemFromSeat(product: Product, seat: Seat) {
    seat.items.forEach((item, index) => {
      if(product.GUID === item.GUID){
        seat.items.splice(index, 1);
      }
    });
  };
  
  public correctSeatNumbers(table: Table): void{
    table.seats.forEach((seat,index) => {
      seat.number = index + 1;
    });
  }

  public addItemToSeat(seat: Seat, product: Product): void {
    seat.items.push(product);
    this.calculateSubTotal(seat);
  }

  public calculateSubTotal(seat: Seat): void {
    const prices = seat.items.map(item => {
      return item.price;
    });

    seat.subtotal = prices.reduce((acc, curr): number => {
      return seat.subtotal = acc + curr;
    });
  }

  public setOpenSeat(seat: Seat): Seat {
    this.openSeat = seat;
    return this.openSeat;
  }

  public getOpenSeat(): Seat {
    return this.openSeat;
  }
}
