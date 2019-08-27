import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor() { }

public tables = [
  {
    number: 100,
    serverId: 1,
    seats: [],
    billPrinted: false,
    createdAt: Date.now(),
    lastItemOrdered: Date.now()
  },
  {
    number: 101,
    serverId: 1,
    seats: [],
    billPrinted: false,
    createdAt: Date.now(),
    lastItemOrdered: Date.now()
  },
  {
    number: 102,
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
