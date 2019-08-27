import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor() { }

public tables = [
  {
    name: '100',
    serverId: 1,
    seats: [
      {
        name: 'Pesto Salad',
        price: 16.99,
        GST: 1.50,
        posCategory: 'Food',
        sent: true,
        GUID: '3412',
        table: '100'
      },
      {
        name: 'Pesto Salad',
        price: 16.99,
        GST: 1.50,
        posCategory: 'Food',
        sent: true,
        GUID: '3412',
        table: '100'
      }
    ],
    billPrinted: false,
    createdAt: new Date().toLocaleTimeString(),
    lastItemOrdered: new Date().toLocaleTimeString()
  },
  {
    name: '101',
    serverId: 1,
    seats: [
      {
        name: 'Chicken Burger',
        price: 15.99,
        GST: 1.00,
        posCategory: 'Food',
        sent: true,
        GUID: '1234',
        table: '101'
      },
      {
        name: 'Lager',
        price: 7.99,
        GST: .50,
        posCategory: 'Drink',
        sent: true,
        GUID: '2341',
        table: '101'
      }
    ],
    billPrinted: false,
    createdAt: new Date().toLocaleTimeString(),
    lastItemOrdered: new Date().toLocaleTimeString()
  },
  {
    name: '102',
    serverId: 2,
    seats: [
      {
        name: 'Lager',
        price: 7.99,
        GST: .50,
        posCategory: 'Drink',
        sent: true,
        GUID: '2341',
        table: '102'
      }
    ],
    billPrinted: false,
    createdAt: new Date().toLocaleTimeString(),
    lastItemOrdered: new Date().toLocaleTimeString()
  },
];

public getServerTables(serverId: number) {
  const serverTables = this.tables.filter(table => {
    return table.serverId === serverId;
  });

  console.log(serverTables);

  return serverTables;
}
}
