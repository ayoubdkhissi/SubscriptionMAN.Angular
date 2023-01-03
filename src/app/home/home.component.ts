import { Component, OnInit } from '@angular/core';
import { ISubscriptionServiceDTO } from '../core/interfaces/ISubscriptionServiceDTO';
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
  subscriptionServices: ISubscriptionServiceDTO[] = [];
  pageTitle: string = 'List Of your Subscription Services';


  public username: string = '';

  constructor(tokenService: TokenService,
    subscriptionServiceService: SubscriptionServiceService) {
    this._tokenService = tokenService;
    this._subscriptionServiceService = subscriptionServiceService;
  }
  
  ngOnInit(): void {
    this.username = this._tokenService.getSession()?.userName || '';
    
    this._subscriptionServiceService.getSubscriptionServices().subscribe({
      next: (response) => {
        this.subscriptionServices = response;
      }
    });
  }



}
