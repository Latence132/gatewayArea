import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { IPlayer, Player } from 'app/shared/model/player.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { PlayerDetailComponent } from './player-detail.component';
import { PlayerUpdateComponent } from './player-update.component';
import { PlayerComponent } from './player.component';
import { PlayerService } from './player.service';


@Injectable({ providedIn: 'root' })
export class PlayerResolve implements Resolve<IPlayer> {
  constructor(private service: PlayerService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IPlayer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((player: HttpResponse<Player>) => {
          if (player.body) {
            return of(player.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    // here if no player Id
    return of();
  }
}

export const playerRoute: Routes = [
  {
    path: '',
    component: PlayerComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.player.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlayerDetailComponent,
    resolve: {
      player: PlayerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.player.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlayerUpdateComponent,
    resolve: {
      player: PlayerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.player.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlayerUpdateComponent,
    resolve: {
      player: PlayerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.player.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
