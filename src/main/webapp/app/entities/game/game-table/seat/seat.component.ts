import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'app/shared/model/card.model';
import { IPlayer } from 'app/shared/model/player.model';

@Component({
  selector: 'seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {

  @Input() money: number | undefined;
  @Input() player: IPlayer | undefined;
  @Input() cards: ICard[] | undefined;
  constructor() { }

  ngOnInit(): void {
    /*eslint-disable no-console*/
    console.log(`seat initialized ${this.player!.name}`);
  }

}
