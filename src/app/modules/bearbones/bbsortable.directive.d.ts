import { ElementRef, EventEmitter, AfterContentInit, Renderer2, OnInit } from '@angular/core';
export declare class BBSortableDirective implements OnInit, AfterContentInit {
    el: ElementRef;
    renderer: Renderer2;
    constructor(el: ElementRef, renderer: Renderer2);
    name: string;
    options: any;
    orderChanged: EventEmitter<{}>;
    draggedItem: number;
    dropTarget: any;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    dragstart(event: any): void;
    dragend(event: any): void;
    dragover(event: any): void;
    dragenter(event: any): void;
    dragleave(event: any): void;
    drop(event: any): void;
    initChildren(): void;
    updateDropzoneClass(event: any, cssClass: string, adding: boolean): void;
}
