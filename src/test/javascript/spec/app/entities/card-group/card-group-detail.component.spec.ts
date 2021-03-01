import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { CardGroupDetailComponent } from 'app/entities/card-group/card-group-detail.component';
import { CardGroup } from 'app/shared/model/card-group.model';

describe('Component Tests', () => {
  describe('CardGroup Management Detail Component', () => {
    let comp: CardGroupDetailComponent;
    let fixture: ComponentFixture<CardGroupDetailComponent>;
    const route = ({ data: of({ cardGroup: new CardGroup(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardGroupDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CardGroupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CardGroupDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cardGroup on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cardGroup).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
