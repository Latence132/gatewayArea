import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from 'app/shared/shared.module';

import { MetricsComponent } from './metrics.component';

import { metricsRoute } from './metrics.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild([metricsRoute])],
  declarations: [MetricsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MetricsModule { }
