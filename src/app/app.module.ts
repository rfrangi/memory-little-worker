import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {RegisterFormComponent} from '../components/register-form/register-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MemoryComponent} from '../components/memory/memory.component';
import {HttpClientModule} from '@angular/common/http';
import {CardComponent} from '../components/card/card.component';
import {MatMenuModule} from '@angular/material/menu';
import {HistoryComponent} from '../components/history/history.component';
import {authInterceptorProviders} from "../interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    MemoryComponent,
    CardComponent,
    HistoryComponent
  ],
  imports: [
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
