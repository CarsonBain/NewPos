import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InteractionsComponent } from './components/main/interactions/interactions.component';
import { ProductsListingComponent } from './components/main/products/product-listing/product-listing.component';
import { CategoryNavComponent } from './components/main/products/category-nav/category-nav.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { ProductsComponent } from './components/main/products/products.component';
import { TextInputComponent } from './shared/text-input/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InteractionsComponent,
    ProductsListingComponent,
    ProductsComponent,
    CategoryNavComponent,
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
