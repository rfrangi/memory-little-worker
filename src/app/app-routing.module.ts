import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginFormComponent} from '../components/login-form/login-form.component';
import {RegisterFormComponent} from '../components/register-form/register-form.component';
import {MemoryComponent} from '../components/memory/memory.component';
import {AuthGuard} from '../guards/auth.gard';
import {HistoryComponent} from '../components/history/history.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'history', component: HistoryComponent, canActivate: [ AuthGuard ]},
  { path: 'memory',  canActivate: [ AuthGuard ],
    children: [
      { path: '', component: MemoryComponent },
      { path: ':id', component: MemoryComponent }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
