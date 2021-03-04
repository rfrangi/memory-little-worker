import {Injectable} from '@angular/core';
import {Card} from '../models/card.model';
import {HttpClient} from '@angular/common/http';
import {HTTP_OPTIONS, URL_GATEWAY} from '../utils/fetch.util';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class MemoryService {

  constructor(private http: HttpClient) { }

  saveScore(score: number): Observable<any> {
    return this.http.post(URL_GATEWAY + 'account/cards/scores', {
      score
    }, HTTP_OPTIONS);
  }

  initCards(): Card[] {
    // TODO: appel vers le back lorsque le token sera valide dans les headers
    /*
    return this.http.post(URL_GATEWAY + 'account/cards?size=4', {
      score
    }, HTTP_OPTIONS);*/

    return [
      new Card({code: 'FACEBOOK', img: 'assets/icon-facebook.svg'}),
      new Card({code: 'INSTAGRAM', img: 'assets/icon-instagram.svg'}),
    /*  new Card({code: 'LINKEDIN', img: 'assets/icon-linkedin.svg'}),
      new Card({code: 'MESSENGER', img: 'assets/icon-messenger.svg'}),
      new Card({code: 'SKYPE', img: 'assets/icon-skype.svg'}),
      new Card({code: 'SNAPCHAT', img: 'assets/icon-snapchat.svg'}),
      new Card({code: 'WHATSAPP', img: 'assets/icon-whatsapp.svg'}),
      new Card({code: 'YOUTUBE', img: 'assets/icon-youtube.svg'}),*/
      new Card({code: 'FACEBOOK', img: 'assets/icon-facebook.svg'}),
      new Card({code: 'INSTAGRAM', img: 'assets/icon-instagram.svg'}),
     /* new Card({code: 'LINKEDIN', img: 'assets/icon-linkedin.svg'}),
      new Card({code: 'MESSENGER', img: 'assets/icon-messenger.svg'}),
      new Card({code: 'SKYPE', img: 'assets/icon-skype.svg'}),
      new Card({code: 'SNAPCHAT', img: 'assets/icon-snapchat.svg'}),
      new Card({code: 'WHATSAPP', img: 'assets/icon-whatsapp.svg'}),
      new Card({code: 'YOUTUBE', img: 'assets/icon-youtube.svg'})*/
    ].sort((a, b) => a.order - b.order);
  }
}
