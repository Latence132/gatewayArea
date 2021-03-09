import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from 'app/shared/shared.module';

import { AuditsComponent } from './audits.component';

import { auditsRoute } from './audits.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild([auditsRoute])],
  declarations: [AuditsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuditsModule { }
