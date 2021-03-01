import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { CardGroupUpdateComponent } from 'app/entities/card-group/card-group-update.component';
import { CardGroupService } from 'app/entities/card-group/card-group.service';
import { CardGroup } from 'app/shared/model/card-group.model';

describe('Component Tests', () => {
  describe('CardGroup Management Update Component', () => {
    let comp: CardGroupUpdateComponent;
    let fixture: ComponentFixture<CardGroupUpdateComponent>;
    let service: CardGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardGroupUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CardGroupUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CardGroupUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CardGroupService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CardGroup(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CardGroup();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
