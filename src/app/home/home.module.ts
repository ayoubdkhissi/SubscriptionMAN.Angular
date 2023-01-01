import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AddSubscriptionServiceComponent } from './add-subscription-service/add-subscription-service.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [HomeComponent, AddSubscriptionServiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class HomeModule { }
