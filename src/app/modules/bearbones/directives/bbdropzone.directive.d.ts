import { ElementRef, Renderer2, OnInit } from '@angular/core';
import { BearbonesService } from '../services/bearbones.service';
export declare class BBDropzoneDirective implements OnInit {
    el: ElementRef;
    bbService: BearbonesService;
    renderer: Renderer2;
    constructor(el: ElementRef, bbService: BearbonesService, renderer: Renderer2);
    ngOnInit(): void;
    bbdropzoneClass: string;
    bbdropzoneHoverClass: string;
    bbmodel: Array<any>;
    dragover(event: any): void;
    dragenter(): void;
    dragleave(): void;
    drop(event: any): void;
}
