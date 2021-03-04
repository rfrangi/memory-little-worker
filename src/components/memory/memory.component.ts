import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {timer, Subscription} from 'rxjs';

import {Card } from '../../models/card.model';
import {Histo} from '../../models/history.model';

import {MemoryService} from '../../services/memory.service';
import {HistoryService} from '../../services/history.service';

@Component({
  selector: 'app-memory',
  template: `
    <section>
      <p>Appuyer pour démarrer</p>
      <span>{{ tick }} Seconde(s)</span>
      <div class="plateau">
        <app-card *ngFor="let card of cards"
                  [card]="card"
                  (click)="histoReplay == null ? clickOnCard(card) : ''">
        </app-card>
      </div>
    </section>
`,
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit, OnDestroy {

  tick = 0;
  subscription!: Subscription;

  cards!: Array<Card>;
  firstCardSelected: any;
  firstClick = true;
  hasRightSelected = true;

  histo!: Histo;

  histoReplay!: Histo | null | undefined;

  constructor(private memoryService: MemoryService,
              private historyService: HistoryService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.onParamsChange(params);
    });
  }

  onParamsChange(params: any): any {
    if (params.id){

      this.initGameByHisto(params.id);
    } else {
      this.initGame();
    }
  }

  initGameByHisto(id: string): void {
    this.histoReplay = this.historyService.getById(id);
    if (this.histoReplay){
      this.cards = this.histoReplay.game.map(val => {
        val.status = 'default';
        return val;
      });

      this.hasRightSelected = false;
      this.initTimer();
    }
  }

  clickOnCardAuto(cardSelected: Card): void {
    if (this.histoReplay){
      cardSelected.status = 'success';
      if (!this.firstCardSelected) {
        this.firstCardSelected = cardSelected;
        return;
      }

      if (this.firstCardSelected.code === cardSelected.code) {
        cardSelected.status = 'success';
        this.firstCardSelected = undefined;
      } else {
        this.hasRightSelected = false;
        setTimeout(() => {
          cardSelected.status = 'default';
          this.firstCardSelected.status = 'default';
          this.firstCardSelected = undefined;
        }, 2000);
      }

      if (!this.cards.some(card => card.status === 'default')) {
        this.subscription.unsubscribe();
      }
      return;
    }
  }

  clickOnCard(cardSelected: Card): void {
    // TODO: Refactor, possibilité de créer des méthode pour chaque cas
    cardSelected.time = this.tick * 1000;
    this.histo.actions.push(new Card(cardSelected));
    console.log(this.histo.actions);
    // Au 1er clique, on initialise le timer
    if (this.firstClick) {
      this.initTimer();
      this.firstClick = false;
    }
    // Cas ou la carte est deja trouvé ou une animation est lancee
    if (cardSelected.status === 'success' || !this.hasRightSelected) {
      return;
    }

    cardSelected.status = 'success';
    // Si c'est la 1ere carte, on l'enregistre
    if (!this.firstCardSelected) {
      this.firstCardSelected = cardSelected;
      return;
    }


    if (this.firstCardSelected.code === cardSelected.code) {
      cardSelected.status = 'success';
      this.firstCardSelected = undefined;
      this.endGame();
    } else {
      this.hasRightSelected = false;
      setTimeout(() => {
        cardSelected.status = 'default';
        this.firstCardSelected.status = 'default';
        this.firstCardSelected = undefined;
        this.hasRightSelected = true;
        }, 2000);
    }
  }

  endGame(): void {
    if (!this.cards.some(card => card.status === 'default')) {
      this.histo.score = this.tick * 1000;
      this.historyService.saveHisto(this.histo);
      this.memoryService.saveScore(this.histo.score).subscribe(
        () => {},
        err => console.error(err)
      );
      alert(`Bravo, votre score est de ${this.histo.score}`);
      this.initGame();
    }
  }

  initTimer(): void {
    const ti = timer(0, 10);
    this.subscription = ti.subscribe(
      val => {
        this.tick = val / 100;
        if (this.histoReplay){
          const cardHisto = this.histoReplay.actions.find((v: Card) => v.time === this.tick * 1000);
          if (cardHisto) {
            const cardMAJ = this.cards.find(c => c.order === cardHisto.order);
            if (cardMAJ) {
              this.clickOnCardAuto(cardMAJ);
            }
          }
        }
      }
    );
  }

  initGame(): void {
    this.cards = this.memoryService.initCards();
    this.histo = new Histo({game: this.cards});
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.hasRightSelected = true;
    this.firstClick = true;
    this.firstCardSelected = undefined;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
