import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthentificationService} from '../../services/authentification.service';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  template: `
    <h1>Identification</h1>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Email" formControlName="email" required>
        <button
          mat-icon-button
          matSuffix
          type="button"
          name="icon-mail"
          tabindex="-1">
          <mat-icon color="accent">email</mat-icon>
        </button>
        <mat-error *ngIf="submitted && loginForm.controls.email?.errors?.required">Veuillez saisir une adresse mail</mat-error>
        <mat-error *ngIf="submitted && loginForm.controls.email?.errors?.email">Veuillez saisir une adresse mail valide</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput
               placeholder="Mot de passe"
               [type]="hide ? 'password' : 'text'"
               formControlName="password"
               name="password"
               autocomplete="on"
               required>
        <button mat-icon-button
                matSuffix
                (click)="hide = !hide"
                name="hide-password"
                type="button"
                tabindex="-1"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hide">
          <mat-icon color="accent">
            {{hide ? 'visibility_off' : 'visibility'}}
          </mat-icon>
        </button>
        <mat-error *ngIf="submitted && loginForm.controls.password?.errors?.required">Veuillez saisir un mot de passe</mat-error>
      </mat-form-field>
      <button
        mat-raised-button
        color="accent"
        type="submit">
        Connexion
      </button>
      <div class="action-link">
        <a [routerLink]="['/register']">
          <mat-icon>keyboard_arrow_left</mat-icon>
          Inscription
        </a>
      </div>
    </form>
`,
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  hide = true;

  constructor(private formBuilder: FormBuilder,
              private authentificationService: AuthentificationService,
              private tokenService: TokenService,
              private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['test2@test.com', [Validators.required, Validators.email]],
      password: ['test1234', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authentificationService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenService.saveToken(data.token);
        this.router.navigateByUrl('memory');
      },
      err => {
        // TODO: Gestion des erreurs + Afficher l'info à l'utilisateur via une popup
        console.error(err);
      }
    );
  }
}
