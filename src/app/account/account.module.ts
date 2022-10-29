import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FlexLayoutModule } from '@angular/flex-layout';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [LoginComponent, RegisterComponent],

    imports: [
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,

        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,

        CommonModule

        
    ]
})
export class AccountModule{}