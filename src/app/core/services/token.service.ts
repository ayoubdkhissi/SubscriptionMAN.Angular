import { Injectable } from "@angular/core";
import { ITokenSession } from "../interfaces/ITokenSession";
import { IAuthResponse } from "../interfaces/Responses/IAuthResponse";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class TokenService
{

    private _authService : AuthService;

    constructor(authService: AuthService) {
        this._authService = authService;
    }

    saveSession(authResponse: IAuthResponse): void
    {
        if(authResponse.isSuccess)
        {
            localStorage.setItem("AT", authResponse.token);
            localStorage.setItem("RT", authResponse.refreshToken);
            localStorage.setItem("username", authResponse.username);
        }
    }

    getSession(): ITokenSession  | null
    {
        if(localStorage.getItem('AT'))
        {

        
            const authResponse: ITokenSession =  
            {
                
                accessToken: localStorage.getItem('AT') || '',
                refreshToken: localStorage.getItem('RT') || '',
                userName: localStorage.getItem('username') ||'' 
            };
            return authResponse;
        }
        return null;
    }

    clearSession(): void
    {
        localStorage.clear();
    }

    isLoggedIn(): boolean
    {
        const session = this.getSession();
        if(!session)
        {
            return false;
        }

        const token = JSON.parse(atob(session.accessToken.split('.')[1]));

        const tokenExpired = Date.now() > (token.exp * 1000);

        return !tokenExpired;
    }

}