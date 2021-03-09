import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGame, Game } from 'app/shared/model/game.model';
import { GameService } from './game.service';
import { ICardGroup } from 'app/shared/model/card-group.model';
import { CardGroupService } from 'app/entities/card-group/card-group.service';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';

type SelectableEntity = ICardGroup | IPlayer;

@Component({
  selector: 'game-update',
  templateUrl: './game-update.component.html',
})
export class GameUpdateComponent implements OnInit {
  isSaving = false;
  cardgroups: ICardGroup[] = [];
  players: IPlayer[] = [];

  editForm = this.fb.group({
    id: [],
    state: [],
    cardGroup: [],
    players: [],
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
      this.updateForm(game);

      this.cardGroupService.query().subscribe((res: HttpResponse<ICardGroup[]>) => (this.cardgroups = res.body || []));

      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));
    });
  }

  updateForm(game: IGame): void {
    this.editForm.patchValue({
      id: game.id,
      state: game.state,
      cardGroup: game.cardGroup,
      players: game.players,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const game = this.createFromForm();
    if (game.id !== undefined) {
      this.subscribeToSaveResponse(this.gameService.update(game));
    } else {
      this.subscribeToSaveResponse(this.gameService.create(game));
    }
  }

  private createFromForm(): IGame {
    return {
      ...new Game(),
      id: this.editForm.get(['id'])!.value,
      state: this.editForm.get(['state'])!.value,
      cardGroup: this.editForm.get(['cardGroup'])!.value,
      players: this.editForm.get(['players'])!.value,
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
