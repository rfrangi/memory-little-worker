import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import {AuthentificationService} from '../../services/authentification.service';

@Component({
  selector: 'app-register-form',
  template: `
    <h1>Inscription</h1>
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Email" formControlName="email" required>
        <button
          mat-icon-button
          matSuffix
          type="button"
          matTooltip="vous@exemple.com"
          name="icon-mail"
          tabindex="-1">
          <mat-icon color="accent">email</mat-icon>
        </button>
        <mat-error *ngIf="submitted && registerForm.controls.email?.errors?.required">
          Veuillez saisir une adresse email
        </mat-error>
        <mat-error *ngIf="submitted && registerForm.controls.email?.errors?.email">
          Veuillez saisir une adresse email valide
        </mat-error>
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
                matTooltip="Le mot de passe doit contenir 6 caractères minimum"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hide">
          <mat-icon color="accent">
            {{hide ? 'visibility_off' : 'visibility'}}
          </mat-icon>
        </button>
        <mat-error *ngIf="submitted && registerForm.controls.password?.errors?.required">
          Veuillez saisir un mot de passe
        </mat-error>
        <mat-error *ngIf="submitted && registerForm.controls.password?.errors?.minlength">
          Ce mot de passe est trop court
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput
               placeholder="Confirmation"
               [type]="hideConfirm ? 'password' : 'text'"
               formControlName="confirm"
               name="confirm"
               autocomplete="on"
               required>
        <button mat-icon-button
                matSuffix
                (click)="hideConfirm = !hideConfirm"
                name="hide-password-confirm"
                type="button"
                tabindex="-1"
                matTooltip="Le mot de passe doit contenir 6 caractères minimum"
                [attr.aria-label]="'Hide password confirm'"
                [attr.aria-pressed]="hideConfirm">
          <mat-icon color="accent">
            {{hideConfirm ? 'visibility_off' : 'visibility'}}
          </mat-icon>
        </button>
        <mat-error *ngIf="submitted && registerForm.controls.confirm?.errors?.required">
          Veuillez saisir le même mot de passe
        </mat-error>
        <mat-error *ngIf="submitted && registerForm.controls.confirm?.errors?.minlength">
          Ce mot de passe est trop court
        </mat-error>
      </mat-form-field>
      <button
        mat-raised-button
        color="accent"
        type="submit">
        Valider
      </button>
      <div class="action-link">
        <a [routerLink]="['../login']">
          Se connecter
          <mat-icon>keyboard_arrow_right</mat-icon>
        </a>
      </div>
    </form>

`,
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  hide = true;
  hideConfirm = true;

  constructor(private formBuilder: FormBuilder,
              private authentificationService: AuthentificationService,
              private router: Router) {}

  ngOnInit(): void {
    // TODO: Verifier que les mdp saisie sont egaux
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.authentificationService.signup(this.registerForm.value).subscribe(
      () => {
        alert('Vous êtes inscrit');
        this.router.navigateByUrl('login');
      },
      err => {
        console.error(err);
        if (err.error.code === 409){
          alert('Cet Email est dèjà utilisé');
        } else {
          alert(err.error.message);
        }
      }
    );
  }
}
