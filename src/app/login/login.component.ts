import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public serverService: ServerService) { }

  public pinCode = [];

  ngOnInit() {
  }

  public addPin(value: number) {
    this.pinCode.push(value);
    console.log(this.pinCode);
    if (this.pinCode.length === 4) {
      this.attemptSubmit();
    }
  }

  public attemptSubmit() {
    // maybe pass ID to router?
    const pinCode = this.pinCode.join('');
    const server = this.serverService.authenticateServer(pinCode);
    if (server) {
    this.router.navigate(['/menu', server.id]);
    console.log('AUTH');
    } else {
      console.log('False');
    }

  }
}
