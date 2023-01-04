import { Component, OnInit } from '@angular/core';
import { ISubscriptionServiceForInsert } from '../core/interfaces/ISubscriptionServiceForInsert';
import { ISubscriptionServiceForListing } from '../core/interfaces/ISubscriptionServiceForListing';
import { SubscriptionServiceService } from '../core/services/subscription-service.service';
import { TokenService } from '../core/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _tokenService: TokenService;
  private _subscriptionServiceService: SubscriptionServiceService;
  

  // list of subscription services
  subscriptionServices: ISubscriptionServiceForListing[] = [];
  pageTitle: string = 'List Of your Subscription Services';


  public username: string = '';

  constructor(tokenService: TokenService,
    subscriptionServiceService: SubscriptionServiceService) {
    this._tokenService = tokenService;
    this._subscriptionServiceService = subscriptionServiceService;
  }
  
  ngOnInit(): void {
    this.username = this._tokenService.getSession()?.userName || '';
    
    this._subscriptionServiceService.getSubscriptionServicesForListing().subscribe({
      next: (response) => {
        this.subscriptionServices = response;
      }
    });
  }



}
