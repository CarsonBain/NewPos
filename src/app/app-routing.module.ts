import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InteractionsComponent } from './login/interactions/interactions.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'menu/:id',
    component: InteractionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
