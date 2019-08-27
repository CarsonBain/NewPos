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
    seats: [],
    billPrinted: false,
    createdAt: Date.now(),
    lastItemOrdered: Date.now()
  },
  {
    name: '101',
    serverId: 1,
    seats: [],
    billPrinted: false,
    createdAt: Date.now(),
    lastItemOrdered: Date.now()
  },
  {
    name: '102',
    serverId: 2,
    seats: [],
    billPrinted: false,
    createdAt: Date.now(),
    lastItemOrdered: Date.now()
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
