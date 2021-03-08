import { ICardGroup } from 'app/shared/model/card-group.model';

export interface ICard {
  id?: number;
  value?: string;
  symbol?: string;
  imageFrontContentType?: string;
  imageFront?: any;
  groups?: ICardGroup[];
}

export class Card implements ICard {
  constructor(
    public id?: number,
    public value?: string,
    public symbol?: string,
    public imageFrontContentType?: string,
    public imageFront?: any,
    public groups?: ICardGroup[]
  ) {}
}
