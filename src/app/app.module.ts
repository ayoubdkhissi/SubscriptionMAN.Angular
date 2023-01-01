import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AccountModule } from './account/account.module';
import { CoreModule } from './core/core.module';
import { AuthInterceptorProvider } from './core/interceptors/auth.interceptor';
import { ErrorInterceptorProvider } from './core/interceptors/error.interceptor';
import { HomeComponent } from './home/home.component';
import { AddSubscriptionServiceComponent } from './home/add-subscription-service/add-subscription-service.component';
import { HomeModule } from './home/home.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AccountModule,
    HomeModule,
    HttpClientModule,
    
    
  ],
  providers: [
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
