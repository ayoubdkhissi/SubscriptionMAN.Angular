import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAuthRequest } from "../interfaces/Requests/IAuthRequest";
import { IAuthResponse } from "../interfaces/Responses/IAuthResponse";
import {Observable} from "rxjs"

@Injectable({
    providedIn: "root"
})
export class AuthService
{
    /* Constants, should be moved to env variables */
    private baseUrl: string = "https://localhost:7169/api/";
    private loginEndPoint: string = "authenticate";

    /* Injected Services */
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient)
    {
        this._httpClient = httpClient;
    }


    public login(authRequest: IAuthRequest): Observable<IAuthResponse>
    {


        return this._httpClient.post<IAuthResponse>(this.baseUrl+this.loginEndPoint, authRequest);
    }
}
