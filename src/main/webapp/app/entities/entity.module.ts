import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'card',
        loadChildren: () => import('./card/card.module').then(m => m.GatewayCardModule),
      },
      {
        path: 'card-group',
        loadChildren: () => import('./card-group/card-group.module').then(m => m.GatewayCardGroupModule),
      },
      {
        path: 'player',
        loadChildren: () => import('./player/player.module').then(m => m.GatewayPlayerModule),
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.GatewayGameModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
