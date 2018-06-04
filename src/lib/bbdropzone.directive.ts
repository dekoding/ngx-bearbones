import { Directive, ElementRef, HostListener, Input, Renderer2, OnInit } from '@angular/core';
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

    @HostListener('dragover', ['$event']) dragover(event) {
        event.preventDefault();
    }

    @HostListener('dragenter') dragenter() {
        if (this.bbdropzoneHoverClass) {
            this.renderer.addClass(this.el.nativeElement, this.bbdropzoneHoverClass);
        }
    }

    @HostListener('dragleave') dragleave() {
        if (this.bbdropzoneHoverClass) {
            this.renderer.removeClass(this.el.nativeElement, this.bbdropzoneHoverClass);
        }
    }

    @HostListener('drop', ['$event']) drop(event) {
        event.preventDefault();
        this.renderer.removeClass(this.el.nativeElement, this.bbdropzoneHoverClass);

        let dropped = this.bbService.el.nativeElement;
        if (dropped.attributes.bbdropper.value === this.name) {
            this.renderer.removeChild(this.bbService.el.nativeElement.parentNode, this.bbService.el.nativeElement);
            this.renderer.appendChild(this.el.nativeElement, this.bbService.el.nativeElement);
        }
    }

}
