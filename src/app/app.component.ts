import { Component } from '@angular/core';
import {TokenService} from '../services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
<mat-toolbar color="primary">
  <span>Memory Little Worker</span>
  <div class="menu" [matMenuTriggerFor]="menu">
    <mat-icon mat-icon-button
              *ngIf="tokenService.getToken()"
              aria-label="icon-button menu">more_vert
    </mat-icon>
    Menu
  </div>
  <mat-menu #menu="matMenu">
    <button mat-menu-item
            name="btn-ext"
            [routerLink]="['/memory']">
      <mat-icon color="primary">extension</mat-icon>
      Memory
    </button>
    <button mat-menu-item [routerLink]="['/history']">
      <mat-icon color="primary">build</mat-icon>
      Historique
    </button>
    <button mat-menu-item
            name="btn-ext"
            (click)="logout()">
      <mat-icon color="primary">flight_takeoff</mat-icon>
      Deconnexion
    </button>
  </mat-menu>
</mat-toolbar>
<router-outlet></router-outlet>
    `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public tokenService: TokenService,
              private router: Router) {}

  logout(): void {
    this.tokenService.signOut();
    this.router.navigateByUrl('login');
  }
}
