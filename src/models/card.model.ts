export class Card {

  code!: string;
  img!: string;
  status: 'default' | 'success';
  order: number;
  time!: number;

  constructor(data: any = {}) {
    Object.assign(this, data);
    this.status = data.status ? data.status : 'default';
    this.order = data.order ? data.order : Math.random();
  }
}
