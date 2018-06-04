import { Directive, ElementRef, Renderer2, HostListener, Input, OnInit } from '@angular/core';
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
    @Input('bbdata') bbdata:any;

    @HostListener('dragstart', ['$event']) dragstart(event:any) {
        if (this.bbholdingClass !== undefined) {
            this.renderer.addClass(this.el.nativeElement, this.bbholdingClass);
        }
        event.dataTransfer.setData('text/plain', this.bbdata || null);
        this.bbService.el = this.el;
    }

    @HostListener('dragend') dragend() {
        if (this.bbholdingClass !== undefined) {
            this.renderer.removeClass(this.el.nativeElement, this.bbholdingClass);
        }
    }
}
