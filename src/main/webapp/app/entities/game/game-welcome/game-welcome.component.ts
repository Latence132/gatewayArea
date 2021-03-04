import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardGroupService } from 'app/entities/card-group/card-group.service';
import { PlayerService } from 'app/entities/player/player.service';
import { ICardGroup } from 'app/shared/model/card-group.model';
import { Game, IGame } from 'app/shared/model/game.model';
import { IPlayer, Player } from 'app/shared/model/player.model';
import { Observable } from 'rxjs/internal/Observable';
import { GameService } from '../game.service';

type SelectableEntity = ICardGroup | IPlayer;

@Component({
  selector: 'jhi-game-welcome',
  templateUrl: './game-welcome.component.html',
  styleUrls: ['./game-welcome.component.scss']
})
export class GameWelcomeComponent implements OnInit {
  isSaving = false;
  cardgroups: ICardGroup[] = [];
  players: IPlayer[] = [];



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
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ game }) => {

      this.cardGroupService.query().subscribe((res: HttpResponse<ICardGroup[]>) => (this.cardgroups = res.body || []));

      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const playerName: string = this.editForm.get(['playerUser'])!.value;
    console.log("his.playerService.check(playerName);");
    const userPlayer = this.playerService.check(playerName);
    const game = this.createFromForm(userPlayer);
    if (game.id === undefined || game.id === null) {
      // this.subscribeToSaveResponse(this.gameService.create(game));
    } else {
      // this.subscribeToSaveResponse(this.gameService.update(game));
    }
  }

  private createFromForm(userPlayer: any): IGame {

    return {
      ...new Game(),
      id: this.editForm.get(['id'])!.value,
      state: this.editForm.get(['state'])!.value,
      cardGroup: this.editForm.get(['cardGroup'])!.value,
      players: [userPlayer, ...this.editForm.get(['players'])!.value]
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGame>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
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

}
