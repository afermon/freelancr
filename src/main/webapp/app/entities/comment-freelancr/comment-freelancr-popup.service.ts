import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommentFreelancr } from './comment-freelancr.model';
import { CommentFreelancrService } from './comment-freelancr.service';

@Injectable()
export class CommentFreelancrPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private commentService: CommentFreelancrService

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
                this.commentService.find(id)
                    .subscribe((commentResponse: HttpResponse<CommentFreelancr>) => {
                        const comment: CommentFreelancr = commentResponse.body;
                        comment.timestamp = this.datePipe
                            .transform(comment.timestamp, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.commentModalRef(component, comment);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.commentModalRef(component, new CommentFreelancr());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    commentModalRef(component: Component, comment: CommentFreelancr): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.comment = comment;
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
