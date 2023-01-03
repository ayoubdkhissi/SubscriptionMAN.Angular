import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubscriptionServiceDTO } from '../interfaces/ISubscriptionServiceDTO';
import { Observable, tap } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class SubscriptionServiceService {

  /* Constants, should be moved to env variables */
  private baseUrl: string = "https://localhost:7169/api/";
  private createSubscriptionServiceEndPoint: string = "createSS";
  private getSubscriptionServicesEndPoint: string = "getUserSubscriptionServices";


  /* Injected Services */
  private _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }


  // POST: adding a new suscription service
  public createSubscriptionService(subscriptionService: ISubscriptionServiceDTO): Observable<ISubscriptionServiceDTO> {
    return this._httpClient.post<ISubscriptionServiceDTO>(this.baseUrl + this.createSubscriptionServiceEndPoint, subscriptionService);
  }

  // GET: getting all suscription services of the current user
  // TODO: this method should be modified, it will return a list of another ss interface
  // that also maybe contains the count and additional informations.
  public getSubscriptionServices(): Observable<ISubscriptionServiceDTO[]> {
    return this._httpClient.get<ISubscriptionServiceDTO[]>(this.baseUrl + this.getSubscriptionServicesEndPoint).pipe(tap((response) => {
      console.log(response);}));
  }

  
}
