import {Card} from './card.model';

export class Histo {

  id!: string;
  label!: string;
  game: Array<Card> = [];
  score!: number;
  actions: Array<Card> = [];

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.id = data.id ? data.id : Math.floor(Math.random() * (100 + 1)) + '';
    this.label = data.label ? data.label : 'Partie n°' + Math.floor(Math.random() * (100 + 1)) ;
    this.actions = data.actions ? data.actions.map((c: any) => new Card(c)) : [];
  }
}
