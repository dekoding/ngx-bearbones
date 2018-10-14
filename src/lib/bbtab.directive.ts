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

    @Output() bbshowstart = new EventEmitter();
    @Output() bbshowend = new EventEmitter();

    ngOnInit() {
        if (this.active) {
            this.bbshowstart.emit(this.tabName);
            this.bbService.tabsets[this.tabset] = {};
            this.setActive();
        }
    }

    @HostListener('click', ['$event']) onClick(event) {
        this.bbshowstart.emit(this.tabName);
        event.preventDefault();
        this.setActive();
    }

    setActive() {
        let parentElement = this.el.nativeElement.parentNode;
        let child = this.el.nativeElement.children[0];

        let activeClassElement = 'none';
        let activeClassTarget = 'none';

        // Find out if this element, the parent element, or child elements have an active class set.
        // Order of precedence: Parent, tab, child.
        if (parentElement.hasAttribute('bbactiveclass')) {
            activeClassElement = 'parent';
            activeClassTarget = parentElement.attributes['bbtarget'].value;
        }

        if (this.activeClass) {
            activeClassElement = 'tab';
        }

        if (child) {
            if (child.hasAttribute('bbactiveclass')) {
                activeClassElement = 'child';
            }
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
        this.bbshowend.emit(this.tabName);
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
    @Input('bbdisplaystyle') style: string;
    @Input('bbhiddenclass') hiddenclass: string;

    ngOnInit() {
        this.setVisibility();
    }

    ngDoCheck() {
        this.setVisibility();
    }

    setVisibility() {
        const style = this.style ? this.style : 'block';
        const hiddenclass = this.hiddenclass || null;

        const visible = this.bbService.tabsets[this.tabset].activeTab === this.name ? true : false;
        if (hiddenclass) {
            if (visible) {
                this.renderer.removeClass(this.el.nativeElement, hiddenclass);
            } else {
                this.renderer.addClass(this.el.nativeElement, hiddenclass);
            }
        } else {
            const display = visible ? style : 'none';
            this.renderer.setStyle(this.el.nativeElement, 'display', display);
        }
    }
}
