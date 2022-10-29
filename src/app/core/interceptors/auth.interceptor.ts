import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TokenService } from "../services/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{

    /* This should be moved to environment variables */
    private baseUrl: string = "https://localhost:7169/api/";

    /* Services */
    private _tokenService: TokenService;

    constructor(tokenService: TokenService) {
        this._tokenService = tokenService;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        const requestForApis = req.url.startsWith(this.baseUrl);

        const isLoggedIn = this._tokenService.isLoggedIn();

        if(isLoggedIn && requestForApis)
        {
            let session = this._tokenService.getSession();
            if(session)
            {
                req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${session.accessToken}`) });
            }
        }

        return next.handle(req);
    }

    
}

export const AuthInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true };