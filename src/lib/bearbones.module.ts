import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BBSortableDirective } from './bbsortable.directive';
import { BBDropzoneDirective } from './bbdropzone.directive';
import { BBDropperDirective } from './bbdropper.directive';
import { BBTabDirective, BBTabContentDirective } from './bbtab.directive';
import { BearbonesService } from './bearbones.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BBSortableDirective,
        BBDropzoneDirective,
        BBDropperDirective,
        BBTabDirective,
        BBTabContentDirective
    ],
    exports: [
        BBSortableDirective,
        BBDropzoneDirective,
        BBDropperDirective,
        BBTabDirective,
        BBTabContentDirective
    ],
    providers: [
        BearbonesService
    ]
})
export class BearbonesModule { }
