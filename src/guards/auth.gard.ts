import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {TokenService} from "../services/token.service";


@Injectable({providedIn: 'root'})
export class AuthGuard {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.getToken()) {
      return true;
    }
    this.router.navigateByUrl(`login`);
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
