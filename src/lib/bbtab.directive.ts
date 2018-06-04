import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2, OnInit, DoCheck } from '@angular/core';
import { BearbonesService } from './bearbones.service';

@Directive({
    selector: '[bbtab]'
})
export class BBTabDirective implements OnInit {
    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        public bbService: BearbonesService
    ) { }

    @Input('bbtab') tabName: string;
    @Input('bbtabset') tabset: string;
    @Input('bbactive') active: boolean;
    @Input('bbactiveclass') activeClass: string;

    @Output() clicked = new EventEmitter();

    ngOnInit() {
        if (this.active) {
            this.bbService.tabsets[this.tabset] = {};
            this.setActive();
        }
    }

    @HostListener('click', ['$event']) onClick(event) {
        event.preventDefault();
        this.setActive();
    }

    setActive() {
        let parentElement = this.el.nativeElement.parentNode;
        let child = this.el.nativeElement.children[0];

        let activeClassElement = 'none';
        let activeClassTarget = 'none';

        // Find out if this element, the parent element, or child elements have an active class set.
        // Order of precedence: Parent, child, tab.
        if (this.activeClass) {
            activeClassElement = 'tab';
        }

        if (child) {
            if (child.hasAttribute('bbactiveclass')) {
                activeClassElement = 'child';
            }
        }

        if (parentElement.hasAttribute('bbactiveclass')) {
            activeClassElement = 'parent';
            activeClassTarget = parentElement.attributes['bbtarget'].value;
        }

        // If the tab element itself has it set, apply it.
        if (activeClassElement === 'tab') {
            for(let i = 0; i < parentElement.children.length; i++) {
                if (parentElement.children[i].hasAttribute('bbtab')) {
                    this.renderer.setProperty(parentElement.children[i], 'bbactive', false);
                    this.renderer.removeClass(parentElement.children[i], this.activeClass);
                }
            }
            this.renderer.setProperty(this.el.nativeElement, 'bbactive', true);
            this.renderer.addClass(this.el.nativeElement, this.activeClass);
        } else if (activeClassElement === 'child') {
            let childActiveClass = child.attributes.bbactiveclass.value;
            for(let i = 0; i < parentElement.children.length; i++) {
                if (parentElement.children[i].hasAttribute('bbtab')) {
                    this.renderer.setProperty(parentElement.children[i], 'bbactive', false);
                    this.renderer.removeClass(parentElement.children[i].children[0], childActiveClass);
                }
            }
            this.renderer.setProperty(this.el.nativeElement, 'bbactive', true);
            this.renderer.addClass(child, childActiveClass);

        } else if (activeClassElement === 'parent') {
            let parentActiveClass = parentElement.attributes.bbactiveclass.value;
            for(let i = 0; i < parentElement.children.length; i++) {
                if (parentElement.children[i].hasAttribute('bbtab')) {
                    this.renderer.setProperty(parentElement.children[i], 'bbactive', false);
                    if (activeClassTarget === 'tab') {
                        this.renderer.removeClass(parentElement.children[i], parentActiveClass);
                    } else if (activeClassTarget === 'child') {
                        this.renderer.removeClass(parentElement.children[i].children[0], parentActiveClass);
                    }
                }
            }
            this.renderer.setProperty(this.el.nativeElement, 'bbactive', true);
            if (activeClassTarget === 'tab') {
                this.renderer.addClass(this.el.nativeElement, parentActiveClass);
            } else if (activeClassTarget === 'child') {
                this.renderer.addClass(this.el.nativeElement.children[0], parentActiveClass);
            }
        } else {
            // There are no child elements and bbactiveClass isn't set.
            for(let i = 0; i < parentElement.children.length; i++) {
                if (parentElement.children[i].hasAttribute('bbtab')) {
                    this.renderer.setProperty(parentElement.children[i], 'bbactive', false);
                }
            }
            this.renderer.setProperty(this.el.nativeElement, 'bbactive', true);
        }
        this.bbService.tabsets[this.tabset]['activeTab'] = this.tabName;
    }
}

@Directive({
    selector: '[bbtabcontent]'
})
export class BBTabContentDirective implements OnInit, DoCheck {
    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        public bbService: BearbonesService
    ) { }

    @Input('bbtabcontent') name: string;
    @Input('bbtabset') tabset: string;

    ngOnInit() {
        this.setVisibility();
    }

    ngDoCheck() {
        this.setVisibility();
    }

    setVisibility() {
        let display = this.bbService.tabsets[this.tabset].activeTab === this.name ? 'block' : 'none';
        this.renderer.setStyle(this.el.nativeElement, 'display', display);
    }
}
