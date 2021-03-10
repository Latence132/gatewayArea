import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { Game, IGame } from 'app/shared/model/game.model';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { GameDetailComponent } from './game-detail.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameUpdateComponent } from './game-update.component';
import { GameWelcomeComponent } from './game-welcome/game-welcome.component';
import { GameComponent } from './game.component';
import { GameService } from './game.service';


@Injectable({ providedIn: 'root' })
export class GameResolve implements Resolve<IGame> {
  constructor(private service: GameService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IGame> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((game: HttpResponse<Game>) => {
          if (game.body) {
            return of(game.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    // here if no id
    // return of(new Game());
    return of();
  }
}

export const gameRoute: Routes = [
  {
    path: '',
    component: GameWelcomeComponent,
    data: {
      pageTitle: 'gatewayApp.game.home.title'
    }
  },
  {
    path: 'play',
    component: GamePlayComponent,
    data: {
      pageTitle: 'gatewayApp.game.home.title'
    }
  },
  {
    path: 'admin',
    component: GameComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gatewayApp.game.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'admin/:id/view',
    component: GameDetailComponent,
    resolve: {
      game: GameResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gatewayApp.game.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'admin/new',
    component: GameUpdateComponent,
    resolve: {
      game: GameResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gatewayApp.game.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'admin/:id/edit',
    component: GameUpdateComponent,
    resolve: {
      game: GameResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'gatewayApp.game.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
