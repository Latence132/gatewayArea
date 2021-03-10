import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gameState } from 'app/shared/model/enumerations/game-state.model';
import { Player } from 'app/shared/model/player.model';
import { ISeat, Seat } from 'app/shared/model/seat.model';
import { ITable, Table } from 'app/shared/model/table.model';
import { Game, IGame } from 'app/shared/model/game.model';
import { Card, ICard } from 'app/shared/model/card.model';

@Component({
  selector: 'game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {
  /* eslint-disable no-console */
  table: ITable;
  public seats: ISeat[] = [];
  game: IGame;

  constructor(private router: Router) {
    this.game = window.history.state;
    console.log(window.history.state);
    this.game.state = gameState.RUNNING;
    this.shuffle(this.game.cardGroup.cards);
    //  get the cards
    const cards: ICard[] = this.game.cardGroup.cards!;
    //set the table
    this.game.players.forEach(player => {
      this.seats.push(new Seat([cards.shift()!, cards.shift()!], 50, player))
    });
    this.table = new Table(cards, 0, this.seats)
  }

  ngOnInit(): void {
    console.log("game-play init");
  }

  trackId(player: Player): number | undefined {
    return player.id;
  }
  
  shuffle(cards: ICard[] | undefined): void {
    if (cards instanceof Array)
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
      }
  }
  /* eslint-enable no-console */
}
