import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { Table } from 'src/app/models/table/table.model';
import { Seat } from 'src/app/models/seat/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor() { }

public seats: Seat[] = [];

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
      tableNumber: table.number
    };
    table.seats.push(newSeat);
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
  
  // public findOpenSeat(): Seat {
  //   const openSeat = this.seats.filter(seat => {
  //     return seat.open === true;
  //   });
    
  //   return openSeat;
  // }
}
