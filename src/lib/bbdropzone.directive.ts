import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2, OnInit } from '@angular/core';
import { BearbonesService } from './bearbones.service';

@Directive({
    selector: '[bbdropzone]'
})
export class BBDropzoneDirective implements OnInit {
    constructor(
        public el: ElementRef,
        public bbService: BearbonesService,
        public renderer: Renderer2
    ) { }

    ngOnInit() {
        if (this.bbdropzoneClass !== undefined) {
            this.renderer.addClass(this.el.nativeElement, this.bbdropzoneHoverClass);
        }
        if (!this.bbService.dropzones.includes(this.name)) {
            this.bbService.dropzones.push(this.name);
        }
    }

    @Input('bbdropzone') name: string;

    @Input('bbdropzoneClass') bbdropzoneClass: string;
    @Input('bbdropzoneHoverClass') bbdropzoneHoverClass: string;
    @Input('bbdropzoneId') bbdropzoneId: string;
    @Output() bbdata = new EventEmitter();
    @Output() bbenter = new EventEmitter();
    @Output() bbleave = new EventEmitter();
    @Output() bbdrop = new EventEmitter();

    @HostListener('dragover', ['$event']) dragover(event) {
        event.preventDefault();
    }

    @HostListener('dragenter') dragenter() {
        if (this.bbdropzoneHoverClass) {
            this.renderer.addClass(this.el.nativeElement, this.bbdropzoneHoverClass);
        }
        if (this.bbdropzoneId) {
            this.bbenter.emit(this.bbdropzoneId);
        }
    }

    @HostListener('dragleave') dragleave() {
        if (this.bbdropzoneHoverClass) {
            this.renderer.removeClass(this.el.nativeElement, this.bbdropzoneHoverClass);
        }
        if (this.bbdropzoneId) {
            this.bbleave.emit(this.bbdropzoneId);
        }
    }

    @HostListener('drop', ['$event']) drop(event) {
        event.preventDefault();
        this.renderer.removeClass(this.el.nativeElement, this.bbdropzoneHoverClass);

        let dropped = this.bbService.el.nativeElement;
        if (dropped.attributes.bbdropper.value === this.name) {
            this.renderer.removeChild(this.bbService.el.nativeElement.parentNode, this.bbService.el.nativeElement);
            this.renderer.appendChild(this.el.nativeElement, this.bbService.el.nativeElement);
            if (dropped.attributes.bbpayload) {
                this.bbdata.emit(dropped.attributes.bbpayload.value);
            }
        }
        if (this.bbdropzoneId) {
            this.bbdrop.emit(this.bbdropzoneId);
        }
    }

}
