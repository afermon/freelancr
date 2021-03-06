/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FreelancrTestModule } from '../../../test.module';
import { ApplicationMessageFreelancrDialogComponent } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr-dialog.component';
import { ApplicationMessageFreelancrService } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr.service';
import { ApplicationMessageFreelancr } from '../../../../../../main/webapp/app/entities/application-message-freelancr/application-message-freelancr.model';
import { ApplicationFreelancrService } from '../../../../../../main/webapp/app/entities/application-freelancr';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('ApplicationMessageFreelancr Management Dialog Component', () => {
        let comp: ApplicationMessageFreelancrDialogComponent;
        let fixture: ComponentFixture<ApplicationMessageFreelancrDialogComponent>;
        let service: ApplicationMessageFreelancrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FreelancrTestModule],
                declarations: [ApplicationMessageFreelancrDialogComponent],
                providers: [
                    ApplicationFreelancrService,
                    UserService,
                    ApplicationMessageFreelancrService
                ]
            })
            .overrideTemplate(ApplicationMessageFreelancrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicationMessageFreelancrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationMessageFreelancrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ApplicationMessageFreelancr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.applicationMessage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'applicationMessageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ApplicationMessageFreelancr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.applicationMessage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'applicationMessageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
