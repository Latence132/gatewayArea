import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICardGroup } from 'app/shared/model/card-group.model';

@Component({
  selector: 'card-group-detail',
  templateUrl: './card-group-detail.component.html',
})
export class CardGroupDetailComponent implements OnInit {
  cardGroup: ICardGroup | null = null;

  constructor(protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardGroup }) => (this.cardGroup = cardGroup));
  }

  previousState(): void {
    window.history.back();
  }
}
