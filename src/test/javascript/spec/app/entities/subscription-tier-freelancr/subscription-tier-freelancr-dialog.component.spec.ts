/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { SubscriptionTierFreelancrDialogComponent } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr-dialog.component';
import { SubscriptionTierFreelancrService } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr.service';
import { SubscriptionTierFreelancr } from '../../../../../../main/webapp/app/entities/subscription-tier-freelancr/subscription-tier-freelancr.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('SubscriptionTierFreelancr Management Dialog Component', () => {
        let comp: SubscriptionTierFreelancrDialogComponent;
        let fixture: ComponentFixture<SubscriptionTierFreelancrDialogComponent>;
        let service: SubscriptionTierFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [SubscriptionTierFreelancrDialogComponent],
                providers: [
                    UserService,
                    SubscriptionTierFreelancrService
                ]
            })
            .overrideTemplate(SubscriptionTierFreelancrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubscriptionTierFreelancrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscriptionTierFreelancrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubscriptionTierFreelancr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.subscriptionTier = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subscriptionTierListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubscriptionTierFreelancr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.subscriptionTier = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subscriptionTierListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
