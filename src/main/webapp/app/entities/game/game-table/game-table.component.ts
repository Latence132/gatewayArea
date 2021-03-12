import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from 'app/shared/model/player.model';
import { ISeat } from 'app/shared/model/seat.model';
import { ITable } from 'app/shared/model/table.model';

@Component({
  selector: 'game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
})
export class GameTableComponent implements OnInit {
  @Input() table: ITable | undefined;
  constructor() {}

  ngOnInit(): void {}

  trackBySeat(player: ISeat): string {
    return player.player.name;
  }
}
