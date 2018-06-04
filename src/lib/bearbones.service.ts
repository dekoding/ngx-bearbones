import { Injectable } from '@angular/core';

@Injectable()
export class BearbonesService {
    constructor(
    ) { }

    // Variables for drag-and-drop
    el: any;

    dropzoneIndex: number;
    droppableIndex: number;

    model: Array<any>;

    dropzones: Array<any> = [];

    // Variables for tabs
    activeTab: string = '';
    tabsets = {};
}
