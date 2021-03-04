import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {User} from '../models/user.models';

import {HTTP_OPTIONS, URL_GATEWAY} from '../utils/fetch.util';


@Injectable({ providedIn: 'root' })
export class AuthentificationService {

  constructor(private http: HttpClient) { }
  /* 'account/login'*/
  login(params: any = {}): Observable<any> {
    return this.http.post(URL_GATEWAY + 'account/login', {
      login: params.email.trim(),
      password: params.password
    }, HTTP_OPTIONS);
  }

  signup(params: any = {}): Observable<any> {
    return this.http.post(URL_GATEWAY + 'account/register', {
      email: params.email.trim(),
      password: params.password
    }, HTTP_OPTIONS);
  }
}
