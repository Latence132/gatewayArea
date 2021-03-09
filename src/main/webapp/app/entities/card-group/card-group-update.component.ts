import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICardGroup, CardGroup } from 'app/shared/model/card-group.model';
import { CardGroupService } from './card-group.service';
import { ICard } from 'app/shared/model/card.model';
import { CardService } from 'app/entities/card/card.service';

@Component({
  selector: 'card-group-update',
  templateUrl: './card-group-update.component.html',
})
export class CardGroupUpdateComponent implements OnInit {
  isSaving = false;
  cards: ICard[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    cards: [],
  });

  constructor(
    protected cardGroupService: CardGroupService,
    protected cardService: CardService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardGroup }) => {
      this.updateForm(cardGroup);

      this.cardService.query().subscribe((res: HttpResponse<ICard[]>) => (this.cards = res.body || []));
    });
  }

  updateForm(cardGroup: ICardGroup): void {
    this.editForm.patchValue({
      id: cardGroup.id,
      name: cardGroup.name,
      cards: cardGroup.cards,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardGroup = this.createFromForm();
    if (cardGroup.id !== undefined) {
      this.subscribeToSaveResponse(this.cardGroupService.update(cardGroup));
    } else {
      this.subscribeToSaveResponse(this.cardGroupService.create(cardGroup));
    }
  }

  private createFromForm(): ICardGroup {
    return {
      ...new CardGroup(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      cards: this.editForm.get(['cards'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardGroup>>): void {
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

  trackById(index: number, item: ICard): any {
    return item.id;
  }

  getSelected(selectedVals: ICard[], option: ICard): ICard {
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
