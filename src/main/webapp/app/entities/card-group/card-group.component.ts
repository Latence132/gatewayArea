import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICardGroup } from 'app/shared/model/card-group.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CardGroupService } from './card-group.service';
import { CardGroupDeleteDialogComponent } from './card-group-delete-dialog.component';

@Component({
  selector: 'jhi-card-group',
  templateUrl: './card-group.component.html',
})
export class CardGroupComponent implements OnInit, OnDestroy {
  cardGroups: ICardGroup[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected cardGroupService: CardGroupService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.cardGroups = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.cardGroupService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ICardGroup[]>) => this.paginateCardGroups(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.cardGroups = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCardGroups();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICardGroup): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCardGroups(): void {
    this.eventSubscriber = this.eventManager.subscribe('cardGroupListModification', () => this.reset());
  }

  delete(cardGroup: ICardGroup): void {
    const modalRef = this.modalService.open(CardGroupDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cardGroup = cardGroup;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCardGroups(data: ICardGroup[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.cardGroups.push(data[i]);
      }
    }
  }
}
