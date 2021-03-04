import { Injectable } from '@angular/core';
import {Histo} from '../models/history.model';

const HISTO_KEY = 'historique';

@Injectable({ providedIn: 'root'})
export class HistoryService {

  constructor() {}

  public saveHisto(histo: Histo): void {
    const allHisto = this.getAll();
    if (allHisto != null) {
      allHisto.push(histo);
      window.sessionStorage.removeItem(HISTO_KEY);
      window.sessionStorage.setItem(HISTO_KEY,
        JSON.stringify(allHisto.map((h: Histo) => h)));
    } else {
      window.sessionStorage.setItem(HISTO_KEY, JSON.stringify([histo]));
    }
  }

  public getById(id: string): Histo | null | undefined {
    const histoList = this.getAll();
    return histoList != null ? histoList.find((h: Histo) => h.id = id) : null;
  }

  public getAll(): Array<Histo> | null {
    if (sessionStorage.getItem(HISTO_KEY)) {
      const data: any = JSON.parse(sessionStorage?.getItem(HISTO_KEY) || '');
      return data.map((val: any) => new Histo(val));
    }
    return null;
  }
}
