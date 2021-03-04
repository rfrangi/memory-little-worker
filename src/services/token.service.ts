import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root'})
export class TokenService {

  constructor() {}

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | undefined {
    return sessionStorage.getItem(TOKEN_KEY) || undefined;
  }

  signOut(): void {
    window.sessionStorage.clear();
  }
}
