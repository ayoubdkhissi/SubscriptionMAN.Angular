import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AddSubscriptionServiceComponent } from './home/add-subscription-service/add-subscription-service.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'addSubscriptionService', component: AddSubscriptionServiceComponent, canActivate: [AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
