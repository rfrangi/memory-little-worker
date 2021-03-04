import {Component, OnInit} from '@angular/core';
import {Histo} from '../../models/history.model';
import {HistoryService} from '../../services/history.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-history',
  template: `
<h1>Historique</h1>

<p *ngIf="historys && historys.length == 0">Aucune Partie</p>
<table *ngIf="historys && historys.length > 0">
  <thead>
    <tr>
      <th>Id</th>
      <th>Titre</th>
      <th>Score</th>
      <th>Nb Actions</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
        <tr *ngFor="let histo of historys">
          <td>{{histo.id}}</td>
          <td>{{histo.label}}</td>
          <td>{{histo.score}}</td>
          <td>{{histo.actions.length}}</td>
          <td>
            <mat-icon (click)="play(histo.id)">play_circle_outline</mat-icon>
          </td>
        </tr>
    </tbody>
</table>
`,
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  historys: Array<Histo> | null = [];

  constructor(private historyService: HistoryService,
              private router: Router) {}

  ngOnInit(): void {
    this.historys = this.historyService.getAll();
  }

  play(id: string): void {
    this.router.navigateByUrl('memory/' + id);
  }
}
