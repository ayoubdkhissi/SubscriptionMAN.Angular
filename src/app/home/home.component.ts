import { Component, OnInit } from '@angular/core';
import { TokenService } from '../core/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _tokenService: TokenService;
  

  public username: string = '';

  constructor(tokenService: TokenService) 
  { 
    this._tokenService = tokenService;
  }

  ngOnInit(): void {
    this.username = this._tokenService.getSession()?.userName || '';
  }

}
