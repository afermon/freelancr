import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CardFreelancr } from './card-freelancr.model';
import { CardFreelancrService } from './card-freelancr.service';

@Injectable()
export class CardFreelancrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cardService: CardFreelancrService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cardService.find(id)
                    .subscribe((cardResponse: HttpResponse<CardFreelancr>) => {
                        const card: CardFreelancr = cardResponse.body;
                        if (card.deadline) {
                            card.deadline = {
                                year: card.deadline.getFullYear(),
                                month: card.deadline.getMonth() + 1,
                                day: card.deadline.getDate()
                            };
                        }
                        this.ngbModalRef = this.cardModalRef(component, card);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cardModalRef(component, new CardFreelancr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cardModalRef(component: Component, card: CardFreelancr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.card = card;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
