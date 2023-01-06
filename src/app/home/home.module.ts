import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AddSubscriptionServiceComponent } from './add-subscription-service/add-subscription-service.component';
import { AppRoutingModule } from '../app-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [HomeComponent, AddSubscriptionServiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatPaginatorModule
  ]
})
export class HomeModule { }
