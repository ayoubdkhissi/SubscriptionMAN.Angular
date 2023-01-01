import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubscriptionServiceDTO } from '../interfaces/ISubscriptionServiceDTO';
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class SubscriptionServiceService {

  /* Constants, should be moved to env variables */
  private baseUrl: string = "https://localhost:7169/api/";
  private createSubscriptionServiceEndPoint: string = "createSS";


  /* Injected Services */
  private _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }


  // POST: api/subscription-services
  createSubscriptionService(subscriptionService: ISubscriptionServiceDTO): Observable<ISubscriptionServiceDTO> {
    return this._httpClient.post<ISubscriptionServiceDTO>(this.baseUrl + this.createSubscriptionServiceEndPoint, subscriptionService);
  }

  
}
