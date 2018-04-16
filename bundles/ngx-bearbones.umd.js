(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('ngx-bearbones', ['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['ngx-bearbones'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

var BBSortableDirective = /** @class */ (function () {
    function BBSortableDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.orderChanged = new core.EventEmitter();
    }
    BBSortableDirective.prototype.ngOnInit = function () {
        if (!this.options) {
            this.options = {};
        }
    };
    BBSortableDirective.prototype.ngAfterContentInit = function () {
        this.initChildren();
    };
    BBSortableDirective.prototype.dragstart = function (event) {
        if (this.options.holdingClass !== undefined) {
            this.renderer.addClass(event.target, this.options.holdingClass);
        }
        this.draggedItem = +event.target['bbsortable-index'];
        event.dataTransfer.setData('text/plain', event.target['bbvalue'] || null);
    };
    BBSortableDirective.prototype.dragend = function (event) {
        if (this.options.holdingClass !== undefined) {
            this.renderer.removeClass(event.target, this.options.holdingClass);
        }
    };
    BBSortableDirective.prototype.dragover = function (event) {
        event.preventDefault();
    };
    BBSortableDirective.prototype.dragenter = function (event) {
        if (this.options.hoverClass !== undefined) {
            if (event.target['bbsortable-name'] === this.name && event.target['bbsortable-index'] !== this.draggedItem) {
                this.renderer.addClass(event.target, this.options.hoverClass);
            }
            else {
                this.updateDropzoneClass(event, this.options.hoverClass, true);
            }
        }
    };
    BBSortableDirective.prototype.dragleave = function (event) {
        if (this.options.hoverClass !== undefined) {
            if (event.target['bbsortable-name'] === this.name && event.target['bbsortable-index'] !== this.draggedItem) {
                this.renderer.removeClass(event.target, this.options.hoverClass);
            }
            else {
                this.updateDropzoneClass(event, this.options.hoverClass, false);
            }
        }
    };
    BBSortableDirective.prototype.drop = function (event) {
        event.preventDefault();
        var doDrop = false;
        var dropTarget = event.target;
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
            var draggedItem = this.draggedItem;
            var newPosition = dropTarget['bbsortable-index'];
            if (draggedItem > newPosition) {
                for (var i = 0; i < this.el.nativeElement.children.length; i++) {
                    if (i >= newPosition && i < draggedItem) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', i + 1);
                    }
                    if (i === draggedItem) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', newPosition);
                    }
                }
            }
            else {
                for (var i = 0; i < this.el.nativeElement.children.length; i++) {
                    if (i > draggedItem && i <= newPosition) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', i - 1);
                    }
                    if (i === draggedItem) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', newPosition);
                    }
                }
            }
            this.orderChanged.emit({ draggedItem: draggedItem, newPosition: newPosition });
        }
    };
    BBSortableDirective.prototype.initChildren = function () {
        for (var i = 0; i < this.el.nativeElement.children.length; i++) {
            this.renderer.setProperty(this.el.nativeElement.children[i], 'draggable', true);
            this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', i);
            this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-name', this.name);
            if (this.options.restingClass) {
                this.renderer.addClass(this.el.nativeElement.children[i], this.options.restingClass);
            }
        }
    };
    BBSortableDirective.prototype.updateDropzoneClass = function (event, cssClass, adding) {
        var parentNode = event.target.parentNode;
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
    };
    return BBSortableDirective;
}());
BBSortableDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[bbsortable]'
            },] },
];
BBSortableDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
BBSortableDirective.propDecorators = {
    "name": [{ type: core.Input, args: ['bbsortable',] },],
    "options": [{ type: core.Input, args: ['bboptions',] },],
    "orderChanged": [{ type: core.Output },],
    "dragstart": [{ type: core.HostListener, args: ['dragstart', ['$event'],] },],
    "dragend": [{ type: core.HostListener, args: ['dragend', ['$event'],] },],
    "dragover": [{ type: core.HostListener, args: ['dragover', ['$event'],] },],
    "dragenter": [{ type: core.HostListener, args: ['dragenter', ['$event'],] },],
    "dragleave": [{ type: core.HostListener, args: ['dragleave', ['$event'],] },],
    "drop": [{ type: core.HostListener, args: ['drop', ['$event'],] },],
};
var BearbonesService = /** @class */ (function () {
    function BearbonesService() {
    }
    return BearbonesService;
}());
BearbonesService.decorators = [
    { type: core.Injectable },
];
BearbonesService.ctorParameters = function () { return []; };
var BBDropzoneDirective = /** @class */ (function () {
    function BBDropzoneDirective(el, bbService, renderer) {
        this.el = el;
        this.bbService = bbService;
        this.renderer = renderer;
    }
    BBDropzoneDirective.prototype.ngOnInit = function () {
        if (this.bbdropzoneClass !== undefined) {
            this.el.nativeElement.classList.add(this.bbdropzoneClass);
        }
        if (this.bbmodel) {
        }
    };
    BBDropzoneDirective.prototype.dragover = function (event) {
        event.preventDefault();
    };
    BBDropzoneDirective.prototype.dragenter = function () {
        if (this.bbdropzoneHoverClass !== undefined) {
            this.el.nativeElement.classList.add(this.bbdropzoneHoverClass);
        }
    };
    BBDropzoneDirective.prototype.dragleave = function () {
        if (this.bbdropzoneHoverClass !== undefined) {
            this.el.nativeElement.classList.remove(this.bbdropzoneHoverClass);
        }
    };
    BBDropzoneDirective.prototype.drop = function (event) {
        console.log(event);
        event.preventDefault();
        if (this.bbdropzoneHoverClass !== undefined) {
            this.el.nativeElement.classList.remove(this.bbdropzoneHoverClass);
            this.renderer.removeChild(this.bbService.el.nativeElement.parentNode, this.bbService.el.nativeElement);
            this.renderer.appendChild(this.el.nativeElement, this.bbService.el.nativeElement);
        }
    };
    return BBDropzoneDirective;
}());
BBDropzoneDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[bbdropzone]'
            },] },
];
BBDropzoneDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: BearbonesService, },
    { type: core.Renderer2, },
]; };
BBDropzoneDirective.propDecorators = {
    "bbdropzoneClass": [{ type: core.Input, args: ['bbdropzoneClass',] },],
    "bbdropzoneHoverClass": [{ type: core.Input, args: ['bbdropzoneHoverClass',] },],
    "bbmodel": [{ type: core.Input, args: ['bbmodel',] },],
    "dragover": [{ type: core.HostListener, args: ['dragover', ['$event'],] },],
    "dragenter": [{ type: core.HostListener, args: ['dragenter',] },],
    "dragleave": [{ type: core.HostListener, args: ['dragleave',] },],
    "drop": [{ type: core.HostListener, args: ['drop', ['$event'],] },],
};
var BBDropperDirective = /** @class */ (function () {
    function BBDropperDirective(el, bbService) {
        this.el = el;
        this.bbService = bbService;
        el.nativeElement.draggable = true;
        el.nativeElement.dragstart = this.dragstart;
        el.nativeElement.dragend = this.dragend;
    }
    BBDropperDirective.prototype.ngOnInit = function () {
        if (this.bbdropperClass !== undefined) {
            this.el.nativeElement.classList.add(this.bbdropperClass);
        }
    };
    BBDropperDirective.prototype.dragstart = function (event) {
        console.log(event);
        if (this.bbholdingClass !== undefined) {
            this.el.nativeElement.classList.add(this.bbholdingClass);
        }
        event.dataTransfer.setData('text/plain', this.bbdata || null);
        this.bbService.el = this.el;
    };
    BBDropperDirective.prototype.dragend = function () {
        if (this.bbholdingClass !== undefined) {
            this.el.nativeElement.classList.remove(this.bbholdingClass);
        }
    };
    return BBDropperDirective;
}());
BBDropperDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[bbdropper]'
            },] },
];
BBDropperDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: BearbonesService, },
]; };
BBDropperDirective.propDecorators = {
    "bbdropperClass": [{ type: core.Input, args: ['bbdropperClass',] },],
    "bbholdingClass": [{ type: core.Input, args: ['bbholdingClass',] },],
    "bbdata": [{ type: core.Input, args: ['bbdata',] },],
    "dragstart": [{ type: core.HostListener, args: ['dragstart', ['$event'],] },],
    "dragend": [{ type: core.HostListener, args: ['dragend',] },],
};
var BearbonesModule = /** @class */ (function () {
    function BearbonesModule() {
    }
    return BearbonesModule;
}());
BearbonesModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
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

exports.BearbonesModule = BearbonesModule;
exports.ɵd = BBDropperDirective;
exports.ɵb = BBDropzoneDirective;
exports.ɵa = BBSortableDirective;
exports.ɵc = BearbonesService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-bearbones.umd.js.map
