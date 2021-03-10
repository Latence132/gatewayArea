import { IGame } from 'app/shared/model/game.model';

export interface IPlayer {
  id: number;
  name: string;
  games?: IGame[];
}

export class Player implements IPlayer {
  constructor(public id: number, public name: string, public games?: IGame[]) { }
}
