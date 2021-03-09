import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { GameComponent } from './game.component';
import { GameDetailComponent } from './game-detail.component';
import { GameUpdateComponent } from './game-update.component';
import { GameDeleteDialogComponent } from './game-delete-dialog.component';
import { gameRoute } from './game.route';
import { GameWelcomeComponent } from './game-welcome/game-welcome.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameTableComponent } from './game-table/game-table.component';
import { SeatComponent } from './game-table/seat/seat.component';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(gameRoute)],
  declarations: [GameComponent, GameDetailComponent, GameUpdateComponent, GameDeleteDialogComponent, GameWelcomeComponent, GamePlayComponent, GameTableComponent, SeatComponent],
  entryComponents: [GameDeleteDialogComponent],
})
export class GatewayGameModule {}
