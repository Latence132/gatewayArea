import { ICardGroup } from 'app/shared/model/card-group.model';
import { IPlayer } from 'app/shared/model/player.model';
import { gameState } from 'app/shared/model/enumerations/game-state.model';

export interface IGame {
  id?: number;
  state?: gameState;
  cardGroup?: ICardGroup;
  players?: IPlayer[];
}

export class Game implements IGame {
  constructor(public id?: number, public state?: gameState, public cardGroup?: ICardGroup, public players?: IPlayer[]) {}
}
