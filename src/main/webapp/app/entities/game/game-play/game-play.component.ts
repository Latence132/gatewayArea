import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gameState } from 'app/shared/model/enumerations/game-state.model';
import { Player } from 'app/shared/model/player.model';
import { ISeat } from 'app/shared/model/seat.model';
import { ITable } from 'app/shared/model/table.model';
import { IGame } from 'app/shared/model/game.model';

@Component({
  selector: 'game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {
  /* eslint-disable no-console */
  @Input() table: ITable | undefined;
  public seats: ISeat | undefined;
  public game: IGame = {};

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log(window.history.state);
    this.game = window.history.state;
    this.game.players?.length;
    this.game.cardGroup
    this.game.state = gameState.RUNNING;
    //  get the cards
    // eslint-disable-next-line
    this.game.players?.forEach((player) => {

    })
    console.log(this.game);
  }
  trackId(index: number, player: Player): number | undefined {
    return player.id;
  }
  /* eslint-enable no-console */
}
