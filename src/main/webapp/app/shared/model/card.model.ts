import { ICardGroup } from 'app/shared/model/card-group.model';

export interface ICard {
  id?: number;
  value?: string;
  symbol?: string;
  groups?: ICardGroup[];
}

export class Card implements ICard {
  constructor(public id?: number, public value?: string, public symbol?: string, public groups?: ICardGroup[]) {}
}
