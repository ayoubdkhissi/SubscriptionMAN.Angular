import { Component, OnInit } from '@angular/core';
import { ISubscriptionServiceForInsert } from '../core/interfaces/ISubscriptionServiceForInsert';
import { ISubscriptionServiceForListing } from '../core/interfaces/ISubscriptionServiceForListing';
import { SubscriptionServiceService } from '../core/services/subscription-service.service';
import { TokenService } from '../core/services/token.service';
import {PageEvent} from '@angular/material/paginator';


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
  
  paginationSize: number = 10;
  paginationPage: number = 1;

  totalNumberOfSubscriptionServices: number = 0;

  public username: string = '';

  constructor(tokenService: TokenService,
    subscriptionServiceService: SubscriptionServiceService) {
    this._tokenService = tokenService;
    this._subscriptionServiceService = subscriptionServiceService;
  }
  
  ngOnInit(): void {
    this.username = this._tokenService.getSession()?.userName || '';
    
    this.loadData(this.paginationSize, this.paginationPage);

    this._subscriptionServiceService.getTotalNumberOfSubscriptionServices().subscribe({
      next: (response) => {
        this.totalNumberOfSubscriptionServices = response;
      }
    });

  }


  public loadData(pageSize: number, pageNumber: number){
    this._subscriptionServiceService.getSubscriptionServicesForListing(pageSize, pageNumber).subscribe({
      next: (response) => {
        this.subscriptionServices = response;
      }
    });
  }

  pageEvent(event: PageEvent) {
    this.paginationSize = event.pageSize;
    this.paginationPage = event.pageIndex+1;
    this.loadData(this.paginationSize, this.paginationPage);
  }


}
