import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Card} from '../../models/card.model';
import {CHANGE_CARD} from '../../animations/card.animation';

@Component({
  selector: 'app-card',
  animations: CHANGE_CARD,
  template: `
    <div [@cardFlip]="card.status">
        <img [src]="card.status == 'default' ? 'assets/logo.png' : card.img" [alt]="card.code">
    </div>
    <!--{{card.code}}-->
`,
  styleUrls: ['./card.component.scss']
})
export class CardComponent{

  @Input() card!: Card;
}
