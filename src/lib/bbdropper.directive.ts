import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BearbonesService } from './bearbones.service';

@Directive({
    selector: '[bbdropper]'
})
export class BBDropperDirective implements OnInit {
    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        public bbService: BearbonesService
    ) {
        el.nativeElement.draggable = true;
        el.nativeElement.dragstart = this.dragstart;
        el.nativeElement.dragend = this.dragend;
    }

    ngOnInit() {
        if (this.bbdropperClass) {
            this.renderer.addClass(this.el.nativeElement, this.bbdropperClass);
        }
    }

    @Input('bbdropper') name: string;
    @Input('bbdropperClass') bbdropperClass: string;
    @Input('bbholdingClass') bbholdingClass: string;
    @Input('bbpayload') bbpayload:string;
    @Input('bbdropperId') bbdropperId: string;
    @Output() bbstart = new EventEmitter();
    @Output() bbend = new EventEmitter();

    @HostListener('dragstart', ['$event']) dragstart(event:any) {
        if (this.bbholdingClass !== undefined) {
            this.renderer.addClass(this.el.nativeElement, this.bbholdingClass);
        }
        event.dataTransfer.setData('text/plain', this.bbpayload || null);
        this.bbService.el = this.el;
        if(this.bbdropperId) {
            this.bbstart.emit(this.bbdropperId);
        }
    }

    @HostListener('dragend') dragend() {
        if (this.bbholdingClass !== undefined) {
            this.renderer.removeClass(this.el.nativeElement, this.bbholdingClass);
        }
        if(this.bbdropperId) {
            this.bbstart.emit(this.bbdropperId);
        }
    }
}
