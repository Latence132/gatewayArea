import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardGroupService } from 'app/entities/card-group/card-group.service';
import { PlayerService } from 'app/entities/player/player.service';
import { ICardGroup } from 'app/shared/model/card-group.model';
import { Game, IGame } from 'app/shared/model/game.model';
import { IPlayer, Player } from 'app/shared/model/player.model';
import { gameState } from 'app/shared/model/enumerations/game-state.model';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';

type SelectableEntity = ICardGroup | IPlayer;

@Component({
  selector: 'game-welcome',
  templateUrl: './game-welcome.component.html',
  styleUrls: ['./game-welcome.component.scss']
})
export class GameWelcomeComponent implements OnInit, OnDestroy {
  isSaving = false;
  cardgroups: ICardGroup[] = [];
  players: IPlayer[] = [];
  playerNameSub: Subscription = new Subscription();
  subscribeToSaveResponse: Subscription = new Subscription();
  createdGame: NavigationExtras = {
    state: {
      game: {
        gameId: null,
        gameState: null,
        cardGroup: null,
        players: null
      }
    }
  }



  editForm = this.fb.group({
    id: [],
    state: [],
    cardGroup: [],
    players: [],
    playerUser: {}
  });

  constructor(
    protected gameService: GameService,
    protected cardGroupService: CardGroupService,
    protected playerService: PlayerService,
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {

      this.cardGroupService.query().subscribe((res: HttpResponse<ICardGroup[]>) => (this.cardgroups = res.body || []));

      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    /* eslint-disable no-console */
    const playerName: string = this.editForm.get(['playerUser'])!.value;
    this.playerNameSub = this.playerService.check(playerName).subscribe(
      (res) => {
        const userPlayer = new Player(res.id, res.name, res.games)
        const game = this.createFromForm(userPlayer);
        this.subscribeToSaveResponse = this.gameService.create(game).subscribe(
          (res2) => {
            console.log(`game created with ${playerName}`);
            console.log(`res2 => ${res2}`);
            game.id = res2.body!.id;
            this.createdGame.state = game;
            this.router.navigate(['game/play'], this.createdGame);
          }

        );
      },
      (error) => console.log(error)
    );
    /* eslint-enable no-console */
  }

  private createFromForm(userPlayer: Player): IGame {
    return {
      ...new Game(),
      id: this.editForm.get(['id'])!.value,
      state: gameState.STARTING,
      cardGroup: this.editForm.get(['cardGroup'])!.value,
      players: [userPlayer, ...this.editForm.get(['players'])!.value]
    };
  }

  // protected subscribeToSaveResponse(result: Observable<HttpResponse<IGame>>): void {
  //   result.subscribe(
  //     () => this.onSaveSuccess(),
  //     () => this.onSaveError()
  //   );
  // }

  protected onSaveSuccess(): void {
    // this.isSaving = false;
    // this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IPlayer[], option: IPlayer): IPlayer {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }

  ngOnDestroy(): void {
    this.playerNameSub.unsubscribe();
    this.subscribeToSaveResponse.unsubscribe();
  }

}
