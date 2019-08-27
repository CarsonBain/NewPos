import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() { }

  public servers = [{
    name: 'Jon',
    pin: '8989',
    id: 1
  },
  {
    name: 'Carson',
    pin: '0101',
    id: 2
  },
]

public authenticateServer(pin: string) {

  return this.servers.find(server => server.pin === pin);

}
}
