import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, AfterContentInit, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[bbsortable]'
})
export class BBSortableDirective implements OnInit, AfterContentInit {
    constructor(
        public el: ElementRef,
        public renderer: Renderer2
    ) { }

    @Input('bbsortable') name: string;
    @Input('bboptions') options: any;

    // Event emitters
    @Output() orderChanged = new EventEmitter();
    @Output() bbstart = new EventEmitter();
    @Output() bbend = new EventEmitter();
    @Output() bbenter = new EventEmitter();
    @Output() bbleave = new EventEmitter();
    @Output() bbdrop = new EventEmitter();

    draggedItem:number;
    dropTarget:any;

    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
    }

    ngAfterContentInit() {
        this.initChildren();
    }

    // Dropper listeners
    @HostListener('dragstart', ['$event']) dragstart(event) {
        event.dataTransfer.setData('text/plain', event.target['bbvalue'] || null);
        if (this.options.holdingClass !== undefined) {
            this.renderer.addClass(event.target, this.options.holdingClass);
        }

        this.draggedItem = +event.target['bbsortable-index'];
        this.bbstart.emit(this.draggedItem);
    }

    @HostListener('dragend', ['$event']) dragend(event) {
        if (this.options.holdingClass !== undefined) {
            this.renderer.removeClass(event.target, this.options.holdingClass);
        }
        this.bbend.emit(this.draggedItem);
    }

    // Dropzone listeners
    @HostListener('dragover', ['$event']) dragover(event:any) {
        event.preventDefault();
    }

    @HostListener('dragenter', ['$event']) dragenter(event:any) {
        if (this.options.hoverClass !== undefined) {
            if (event.target['bbsortable-name'] === this.name && event.target['bbsortable-index'] !== this.draggedItem) {
                this.renderer.addClass(event.target, this.options.hoverClass);
            } else {
                this.updateDropzoneClass(event, this.options.hoverClass, true);
            }
        }
        this.bbenter.emit(+event.target['bbsortable-index']);
    }

    @HostListener('dragleave', ['$event']) dragleave(event:any) {
        if (this.options.hoverClass !== undefined) {
            if (event.target['bbsortable-name'] === this.name && event.target['bbsortable-index'] !== this.draggedItem) {
                this.renderer.removeClass(event.target, this.options.hoverClass);
            } else {
                this.updateDropzoneClass(event, this.options.hoverClass, false);
            }
        }
        this.bbleave.emit(+event.target['bbsortable-index']);
    }

    @HostListener('drop', ['$event']) drop(event:any) {
        event.preventDefault();

        let doDrop:boolean = false;

        let dropTarget:any = event.target;
        if (dropTarget['bbsortable-name'] !== this.name) {
            while (dropTarget.parentNode !== null) {
                if (dropTarget.parentNode['bbsortable-name'] === this.name) {
                    dropTarget = dropTarget.parentNode;
                    doDrop = true;
                    break;
                } else {
                    dropTarget = dropTarget.parentNode
                }
            }
        } else {
            doDrop = true;
        }

        if (doDrop) {
            if (this.options.hoverClass !== undefined) {
                this.renderer.removeClass(dropTarget, this.options.hoverClass);
            }
            let draggedItem = this.draggedItem;
            let newPosition = dropTarget['bbsortable-index'];

            if (draggedItem > newPosition) {
                for(let i = 0; i < this.el.nativeElement.children.length; i++) {
                    if (i >= newPosition && i < draggedItem) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', i + 1);
                    }

                    if (i === draggedItem) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', newPosition);
                    }
                }
            } else {
                for(let i = 0; i < this.el.nativeElement.children.length; i++) {
                    if (i > draggedItem && i <= newPosition) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', i - 1);
                    }

                    if (i === draggedItem) {
                        this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', newPosition);
                    }
                }
            }
            this.bbdrop.emit(+newPosition);
            this.orderChanged.emit({ draggedItem, newPosition });
        }
    }

    initChildren() {
        for(let i = 0; i < this.el.nativeElement.children.length; i++) {
            this.renderer.setProperty(this.el.nativeElement.children[i], 'draggable', true);
            this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-index', i);
            this.renderer.setProperty(this.el.nativeElement.children[i], 'bbsortable-name', this.name);

            if (this.options.restingClass) {
                this.renderer.addClass(this.el.nativeElement.children[i], this.options.restingClass);
            }
        }
    }

    updateDropzoneClass(event:any, cssClass:string, adding:boolean) {
        let parentNode = event.target.parentNode;
        while (parentNode !== null) {
            if (parentNode['bbsortable-name'] === this.name && parentNode['bbsortable-index'] !== this.draggedItem) {
                if (adding && !parentNode.classList.contains(cssClass)) {
                    this.renderer.addClass(parentNode, cssClass);
                } else {
                    this.renderer.removeClass(parentNode, cssClass);
                }
                break;
            } else {
                parentNode = parentNode.parentNode;
            }
        }
    }
}
