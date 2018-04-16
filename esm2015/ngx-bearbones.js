import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BBSortableDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.orderChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.initChildren();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragstart(event) {
        if (this.options.holdingClass !== undefined) {
            this.renderer.addClass(event.target, this.options.holdingClass);
        }
        this.draggedItem = +event.target['bbsortable-index'];
        event.dataTransfer.setData('text/plain', event.target['bbvalue'] || null);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragend(event) {
        if (this.options.holdingClass !== undefined) {
            this.renderer.removeClass(event.target, this.options.holdingClass);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragenter(event) {
        if (this.options.hoverClass !== undefined) {
            if (event.target['bbsortable-name'] === this.name && event.target['bbsortable-index'] !== this.draggedItem) {
                this.renderer.addClass(event.target, this.options.hoverClass);
            }
            else {
                this.updateDropzoneClass(event, this.options.hoverClass, true);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragleave(event) {
        if (this.options.hoverClass !== undefined) {
            if (event.target['bbsortable-name'] === this.name && event.target['bbsortable-index'] !== this.draggedItem) {
                this.renderer.removeClass(event.target, this.options.hoverClass);
            }
            else {
                this.updateDropzoneClass(event, this.options.hoverClass, false);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        event.preventDefault();
        let /** @type {?} */ doDrop = false;
        let /** @type {?} */ dropTarget = event.target;
        if (dropTarget['bbsortable-name'] !== this.name) {
            while (dropTarget.parentNode !== null) {
                if (dropTarget.parentNode['bbsortable-name'] === this.name) {
                    dropTarget = dropTarget.parentNode;
                    doDrop = true;
                    break;
                }
                else {
                    dropTarget = dropTarget.parentNode;
                }
            }
        }
        else {
            doDrop = true;
        }
        if (doDrop) {
            let /** @type {?} */ draggedItem = this.draggedItem;
            let /** @type {?} */ newPosition = dropTarget['bbsortable-index'];
            if (draggedItem > newPosition) {
                for (let /** @type {?} */ i = 0; i < this.el.nativeElement.children.length; i++) {
                    if (i >= newPosition && i < draggedItem) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', i + 1);
                    }
                    if (i === draggedItem) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', newPosition);
                    }
                }
            }
            else {
                for (let /** @type {?} */ i = 0; i < this.el.nativeElement.children.length; i++) {
                    if (i > draggedItem && i <= newPosition) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', i - 1);
                    }
                    if (i === draggedItem) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', newPosition);
                    }
                }
            }
            this.orderChanged.emit({ draggedItem, newPosition });
        }
    }
    /**
     * @return {?}
     */
    initChildren() {
        for (let /** @type {?} */ i = 0; i < this.el.nativeElement.children.length; i++) {
            this.renderer.setProperty(this.el.nativeElement.children[i], 'draggable', true);
            this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', i);
            this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-name', this.name);
            if (this.options.restingClass) {
                this.renderer.addClass(this.el.nativeElement.children[i], this.options.restingClass);
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} cssClass
     * @param {?} adding
     * @return {?}
     */
    updateDropzoneClass(event, cssClass, adding) {
        let /** @type {?} */ parentNode = event.target.parentNode;
        while (parentNode !== null) {
            if (parentNode['bbsortable-name'] === this.name && parentNode['bbsortable-index'] !== this.draggedItem) {
                if (adding && !parentNode.classList.contains(cssClass)) {
                    this.renderer.addClass(parentNode, cssClass);
                }
                else {
                    this.renderer.removeClass(parentNode, cssClass);
                }
                break;
            }
            else {
                parentNode = parentNode.parentNode;
            }
        }
    }
}
BBSortableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bbsortable]'
            },] },
];
/** @nocollapse */
BBSortableDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
BBSortableDirective.propDecorators = {
    "name": [{ type: Input, args: ['bbsortable',] },],
    "options": [{ type: Input, args: ['bboptions',] },],
    "orderChanged": [{ type: Output },],
    "dragstart": [{ type: HostListener, args: ['dragstart', ['$event'],] },],
    "dragend": [{ type: HostListener, args: ['dragend', ['$event'],] },],
    "dragover": [{ type: HostListener, args: ['dragover', ['$event'],] },],
    "dragenter": [{ type: HostListener, args: ['dragenter', ['$event'],] },],
    "dragleave": [{ type: HostListener, args: ['dragleave', ['$event'],] },],
    "drop": [{ type: HostListener, args: ['drop', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BearbonesService {
    constructor() { }
}
BearbonesService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BearbonesService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BBDropzoneDirective {
    /**
     * @param {?} el
     * @param {?} bbService
     * @param {?} renderer
     */
    constructor(el, bbService, renderer) {
        this.el = el;
        this.bbService = bbService;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.bbdropzoneClass !== undefined) {
            this.el.nativeElement.classList.add(this.bbdropzoneClass);
        }
        if (this.bbmodel) {
            // This is a sortable bound to an array.
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragover(event) {
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    dragenter() {
        if (this.bbdropzoneHoverClass !== undefined) {
            this.el.nativeElement.classList.add(this.bbdropzoneHoverClass);
        }
    }
    /**
     * @return {?}
     */
    dragleave() {
        if (this.bbdropzoneHoverClass !== undefined) {
            this.el.nativeElement.classList.remove(this.bbdropzoneHoverClass);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        console.log(event);
        event.preventDefault();
        if (this.bbdropzoneHoverClass !== undefined) {
            this.el.nativeElement.classList.remove(this.bbdropzoneHoverClass);
            this.renderer.removeChild(this.bbService.el.nativeElement.parentNode, this.bbService.el.nativeElement);
            this.renderer.appendChild(this.el.nativeElement, this.bbService.el.nativeElement);
        }
    }
}
BBDropzoneDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bbdropzone]'
            },] },
];
/** @nocollapse */
BBDropzoneDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: BearbonesService, },
    { type: Renderer2, },
];
BBDropzoneDirective.propDecorators = {
    "bbdropzoneClass": [{ type: Input, args: ['bbdropzoneClass',] },],
    "bbdropzoneHoverClass": [{ type: Input, args: ['bbdropzoneHoverClass',] },],
    "bbmodel": [{ type: Input, args: ['bbmodel',] },],
    "dragover": [{ type: HostListener, args: ['dragover', ['$event'],] },],
    "dragenter": [{ type: HostListener, args: ['dragenter',] },],
    "dragleave": [{ type: HostListener, args: ['dragleave',] },],
    "drop": [{ type: HostListener, args: ['drop', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BBDropperDirective {
    /**
     * @param {?} el
     * @param {?} bbService
     */
    constructor(el, bbService) {
        this.el = el;
        this.bbService = bbService;
        el.nativeElement.draggable = true;
        el.nativeElement.dragstart = this.dragstart;
        el.nativeElement.dragend = this.dragend;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.bbdropperClass !== undefined) {
            this.el.nativeElement.classList.add(this.bbdropperClass);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragstart(event) {
        console.log(event);
        if (this.bbholdingClass !== undefined) {
            this.el.nativeElement.classList.add(this.bbholdingClass);
        }
        event.dataTransfer.setData('text/plain', this.bbdata || null);
        this.bbService.el = this.el;
    }
    /**
     * @return {?}
     */
    dragend() {
        if (this.bbholdingClass !== undefined) {
            this.el.nativeElement.classList.remove(this.bbholdingClass);
        }
    }
}
BBDropperDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bbdropper]'
            },] },
];
/** @nocollapse */
BBDropperDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: BearbonesService, },
];
BBDropperDirective.propDecorators = {
    "bbdropperClass": [{ type: Input, args: ['bbdropperClass',] },],
    "bbholdingClass": [{ type: Input, args: ['bbholdingClass',] },],
    "bbdata": [{ type: Input, args: ['bbdata',] },],
    "dragstart": [{ type: HostListener, args: ['dragstart', ['$event'],] },],
    "dragend": [{ type: HostListener, args: ['dragend',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BearbonesModule {
}
BearbonesModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    BBSortableDirective,
                    BBDropzoneDirective,
                    BBDropperDirective
                ],
                exports: [
                    BBSortableDirective,
                    BBDropzoneDirective,
                    BBDropperDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { BearbonesModule, BBDropperDirective as ɵd, BBDropzoneDirective as ɵb, BBSortableDirective as ɵa, BearbonesService as ɵc };
//# sourceMappingURL=ngx-bearbones.js.map
