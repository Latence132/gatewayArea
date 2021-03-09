import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'app/shared/model/game.model';
import { Player } from 'app/shared/model/player.model';
import { gameState } from 'app/shared/model/enumerations/game-state.model';
import { Card } from 'app/shared/model/card.model';

@Component({
  selector: 'game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {
  /* eslint-disable no-console */
  public game: Game = {};

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log(window.history.state);
    this.game = window.history.state;
    this.game.players?.length;
    this.game.state = gameState.RUNNING;


    this.game.players?.forEach((player) => {

    })
    console.log(this.game);
  }
  trackId(index: number, player: Player): number | undefined {
    return player.id;
  }
  /* eslint-enable no-console */
}
