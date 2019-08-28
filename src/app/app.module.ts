import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InteractionsComponent } from './main/interactions/interactions.component';
import { ProductsComponent } from './main/products/products.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { TextInputComponent } from './shared/text-input/text-input.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InteractionsComponent,
    ProductsComponent,
    MainComponent,
    TextInputComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
