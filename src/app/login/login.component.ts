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
  public error = false;

  ngOnInit() {
  }

  public addPin(value: number) {
    if (this.pinCode.length === 4) {
      this.pinCode = [];
    }
    this.error = false;
    this.pinCode.push(value);
    console.log(this.pinCode);
    if (this.pinCode.length === 4) {
      this.attemptSubmit();
    }
  }

  public clearDigit() {
    this.pinCode.pop();
    this.error = false;
  }

  public attemptSubmit(): void{
    const pinCode = this.pinCode.join('');
    const server = this.serverService.authenticateServer(pinCode);
    if (server) {
    this.router.navigate(['/menu', server.id]);
    } else {
      this.error = true;
    }

  }
}
