import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // Sortables
    items = [ 'item 1', 'item 2', 'item 3', 'item 4' ];

    orderChangedUnstyled(event: any) {
        const { draggedItem, newPosition } = event;
        this.items.splice(newPosition, 0, this.items.splice(draggedItem, 1)[0]);
    }

    fruits = [
        {name: 'Apple', color: 'red'},
        {name: 'Banana', color: 'yellow'},
        {name: 'Orange', color: 'orange'},
        {name: 'Kiwi', color: 'green'}
    ];

    sortOptionsFruit = {
        restingClass: 'dropzone',
        hoverClass: 'dropzone-hover',
        holdingClass: 'dropper-holding'
    };

    orderChangedCustomStyled(event: any) {
        const { draggedItem, newPosition } = event;
        this.fruits.splice(newPosition, 0, this.fruits.splice(draggedItem, 1)[0]);
    }

    cars = [ 'Ford', 'Chevy', 'Nissan', 'Tesla' ];

    sortOptionsCars = {
        restingClass: 'list-group-item',
        hoverClass: 'list-group-item-warning',
        holdingClass: 'list-group-item-success'
    };

    orderChangedBootstrap(event: any) {
        const { draggedItem, newPosition } = event;
        this.cars.splice(newPosition, 0, this.cars.splice(draggedItem, 1)[0]);
    }

    logPayload(event:any) {
        console.log('Payload: ', event);
    }

    logStart(event:any) {
        console.log('Start: ', event);
    }

    logEnd(event:any) {
        console.log('End: ', event);
    }
}
