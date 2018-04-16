import { ElementRef, OnInit } from '@angular/core';
import { BearbonesService } from '../services/bearbones.service';
export declare class BBDropperDirective implements OnInit {
    el: ElementRef;
    bbService: BearbonesService;
    constructor(el: ElementRef, bbService: BearbonesService);
    ngOnInit(): void;
    bbdropperClass: string;
    bbholdingClass: string;
    bbdata: any;
    dragstart(event: any): void;
    dragend(): void;
}
