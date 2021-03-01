import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICardGroup, CardGroup } from 'app/shared/model/card-group.model';
import { CardGroupService } from './card-group.service';
import { CardGroupComponent } from './card-group.component';
import { CardGroupDetailComponent } from './card-group-detail.component';
import { CardGroupUpdateComponent } from './card-group-update.component';

@Injectable({ providedIn: 'root' })
export class CardGroupResolve implements Resolve<ICardGroup> {
  constructor(private service: CardGroupService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardGroup> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cardGroup: HttpResponse<CardGroup>) => {
          if (cardGroup.body) {
            return of(cardGroup.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CardGroup());
  }
}

export const cardGroupRoute: Routes = [
  {
    path: '',
    component: CardGroupComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.cardGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CardGroupDetailComponent,
    resolve: {
      cardGroup: CardGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.cardGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CardGroupUpdateComponent,
    resolve: {
      cardGroup: CardGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.cardGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CardGroupUpdateComponent,
    resolve: {
      cardGroup: CardGroupResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.cardGroup.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
