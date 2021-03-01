import { ICard } from 'app/shared/model/card.model';

export interface ICardGroup {
  id?: number;
  name?: string;
  cards?: ICard[];
}

export class CardGroup implements ICardGroup {
  constructor(public id?: number, public name?: string, public cards?: ICard[]) {}
}
