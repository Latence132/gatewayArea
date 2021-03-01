import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CardGroupComponent } from './card-group.component';
import { CardGroupDetailComponent } from './card-group-detail.component';
import { CardGroupUpdateComponent } from './card-group-update.component';
import { CardGroupDeleteDialogComponent } from './card-group-delete-dialog.component';
import { cardGroupRoute } from './card-group.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(cardGroupRoute)],
  declarations: [CardGroupComponent, CardGroupDetailComponent, CardGroupUpdateComponent, CardGroupDeleteDialogComponent],
  entryComponents: [CardGroupDeleteDialogComponent],
})
export class GatewayCardGroupModule {}
