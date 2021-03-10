import { ICard } from './card.model';
import { ISeat } from './seat.model';

export interface ITable {
    cards: ICard[];
    pot: number;
    seats: ISeat[];

}

export class Table implements ITable {
    constructor(
        public cards: ICard[],
        public pot: number,
        public seats: ISeat[]
    ) {
    }

}
