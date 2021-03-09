import { ICard } from './card.model';
import { ISeat } from './seat.model';

export interface ITable {
    cardGroupId?: number;
    cards?: ICard[];
    pot?: number;
    imageFrontContentType?: string;
    imageFront?: any;
    seats?: ISeat[];
}

export class Table implements ITable {
    constructor(
        public cardGroupId?: number,
        public cards?: ICard[],
        public pot?: number,
        public imageFrontContentType?: string | undefined,
        public imageFront?: any,
        public seats?: ISeat[]) {
    }

}
