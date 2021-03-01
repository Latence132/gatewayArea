import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICardGroup } from 'app/shared/model/card-group.model';
import { CardGroupService } from './card-group.service';

@Component({
  templateUrl: './card-group-delete-dialog.component.html',
})
export class CardGroupDeleteDialogComponent {
  cardGroup?: ICardGroup;

  constructor(protected cardGroupService: CardGroupService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cardGroupService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cardGroupListModification');
      this.activeModal.close();
    });
  }
}
