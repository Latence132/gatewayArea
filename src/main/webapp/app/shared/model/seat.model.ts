import { ICardGroup } from 'app/shared/model/card-group.model';
import { ICard } from './card.model';
import { IPlayer } from './player.model';

export interface ISeat {
    cards?: ICard[];
    money?: number;
    player?: IPlayer;
}

export class Seat implements ISeat {
    constructor(
        public cards?: ICard[],
        public money?: number,
        public player?: IPlayer) {
    }

}
