<img src="https://raw.githubusercontent.com/dekoding/ngx-bearbones/Adding-logo/bearbones.png" style="width: 110px;"/>
# Ngx-Bearbones

A project to create bare-bones Angular widgets ready to be used with any CSS framework. (Bootstrap, Material, SemanticUI, etc.)

**Note**: The ngx-bearbones package currently contains three completed widgets, a drag-and-drop, a sortable, and tabs. I'm working as fast as I can to add more!

## Table of contents
1. [Bearbones Manifesto](#manifesto)
2. [Installation instructions](#installation-instructions)
3. [Documentation](#documentation)
4. [Contributing](#contributing)

## Bearbones Manifesto

There are dozens of Angular widget libraries for multiple CSS frameworks, but there are very few entirely unthemed, functional widgets that allow you to easily implement your own custom styles or test different CSS frameworks without extensively rewriting your components for them.

Enter **Bearbones**, which gives you complete widgets that are not integrated with any CSS framework, but can work with any of them.

* Easily create your own classes for widget components, without having to override existing styles.
* Switch between CSS frameworks as easily as switching class names on a `<div>`.
* Test components without flashy styles getting in the way, while still being fully functional.
* Apply **Bearbones** directives to nearly any HTML element, instead of being locked into specific templates.

## Installation instructions

Install `ngx-bearbones` from `npm`:
```bash
npm install ngx-bearbones --save
```

Import the Bearbones module:
```typescript
import { BearbonesModule } from 'ngx-bearbones';

@NgModule({
  ...
  imports: [ BearbonesModule, ... ]
  ...
})
```

## Documentation

### Drag and drop

The BearBones drag-and-drop widgets consist of two directives, one for "dropzones" and one for "droppers."

Dropzones and droppers must always be assigned the same value for the `bbdropzone` and `bbdropper` inputs, or the dropper will not identify the dropzone as a valid drop target. For example, if your dropper's `bbdropper` attribute is set to `dragdrop1`, the `bbdropzone` attribute on a dropzone must also be "dragdrop1" for it to be a valid target.

Droppers can be assigned a payload (`bbpayload`), which consists of a string that will be emitted by whichever valid dropzone it is dropped on.

You may also set a Dropzone Identifier (`bbdropzoneId`) to uniquely identify individual dropzones. If you do this, you can take advantage of event emitters for dropzones (see below). If `bbdropzoneId` is not set, dropzones will not emit events, with the exception of the `bbdata` event.

Similarly, Dropper Identifiers (`bbdropperId`) can be used to enable event emitters for droppers.

**Important Note**: Droppers don't have to start inside a dropzone. They can appear anywhere in a page.

#### Dropzone API Reference:

##### Inputs

|Name|Description|Type|Required|
|--- |--- |--- |-- |
|**bbdropzone**|Turns any element into a dropzone. Requires a value.|string|yes|
|bbdropzoneHoverClass|Optional class to apply to a dropzone when a valid dropper hovers over it.|string|no|
|bbdropzoneId|Optional unique identifier for a specific dropzone.|string|no|

##### Event Emitters

|Name|Description|Output|
|--- |--- |--- |
|bbenter|Emitted when a dragged item enters a valid target area. **Requires bbdropzoneId.**|Dropzone Identifier: _string_|
|bbleave|Emitted when a dragged item leaves a valid target area. **Requires bbdropzoneId.**|Dropzone Identifier: _string_|
|bbdrop|Emitted when a dragged item is dropped into a valid target area.  **Requires bbdropzoneId.**|Dropzone Identifier: _string_|
|bbdata|Emitted when a dragged item with a payload is dropped into a valid target area|Payload: _string_|

#### Dropper API Reference:

##### Inputs

|Name|Description|Type|Required|
|--- |--- |--- |-- |
|**bbdropper**|Turns any element into a dropper. Requires a value. Must match value of bbdropzone on associated dropzones.|string|yes|
|bbholdingClass|Optional class to apply to a dropper when it is grabbed.|string|no|
|bbdropperId|Optional unique identifier for a specific dropper.|string|no|
|bbpayload|Optional value to pass to the dropzone. If set, valid dropzones will emit a bbdata event with the payload|string|no

##### Event Emitters

|Name|Description|Output|
|--- |--- |--- |
|bbstart|Emitted when dragging an item starts. **Requires bbdropperId.**|Dropper Identifier: _string_|
|bbend|Emitted when a draggable item is released, regardless of where it is released. **Requires bbdropperId.**|Dropper Identifier: _string_|

#### Example:

##### Unstyled, with payload

```html
<ul>
	<li bbdropzone="unstyled" (bbdata)="logPayload($event)">
    	<div bbdropper="unstyled" bbpayload="test data">Unstyled dropper</div>
    </li>
    <li bbdropzone="unstyled" (bbdata)="logPayload($event)"></li>
    <li bbdropzone="unstyled" (bbdata)="logPayload($event)"></li>
</ul>
```

### Sortable

Similar, but not identical, to the drag-and-drop widgets, the sortable widget acts as a container for re-orderable items. Since you are placing elements where they exist already, the sortable does NOT do the work of re-ordering. Instead, it emits an event when a new ordering has been made, and it is up to the component logic to sort the associated array.

#### Sortable API Reference:

##### Inputs

|Name|Description|Type|Required|
|--- |--- |--- |-- |
|**bbsortable**|Turns any element into a sortable widget. Requires a value. All **immediate** children will become sortable elements.|string|yes|
|bboptions|An object containing one or both of the following:<ul><li>holdingClass:_string_ - Optional class to apply to a sortable item while dragging it.</li><li>hoverClass:_string_ - Optional class to apply to a sortable item while _another_ sortable item is hovering over it.</li></ul>|object|no|

**Note**: As the API standardizes, setting the individual options in a manner similar to the rest of NGX-Bearbones will become an option, as will using an options object for all other widgets. Please remember this is a work in progress.

##### Event Emitters

|Name|Description|Output|
|--- |--- |--- |
|bbstart|Emitted when sorting an item starts|Index of selected item: _number_|
|bbend|Emitted when a sortable item is released, regardless of whether it is released in a new location|Index of selected item: _number_|
|bbenter|Emitted when a sortable item is dragged into a valid target area|Index of target area: _number_|
|bbleave|Emitted when a sortable item is dragged out of a valid target area|Index of target area: _number_|
|bbdrop|Emitted when a sortable item is dropped into a valid target area|Index of target area: _number_|
|orderChanged|Emitted when a sortable's order has been changed by a successful drop. Binding this event is **required** for successful sorting.|Object: _{ draggedItem:number, newPosition:number }_|

#### Example:

##### Custom styled

```html
<!-- html template -->
<ul bbsortable="styled" (orderChanged)="orderChangedCustomStyled($event)" [bboptions]="sortOptionsFruit">
	<li *ngFor="let fruit of fruits" [class]="fruit.color">
		<span class="dropper">{{fruit.name}}</span>
	</li>
</ul>
```

```typescript
// component.ts
...
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

// Example function to reorder the array bound to the sortable
orderChangedCustomStyled(event: any) {
	const { draggedItem, newPosition } = event;
    this.fruits.splice(newPosition, 0, this.fruits.splice(draggedItem, 1)[0]);
}
```

### Tabs

BearBones tabs allow you to display tabular data. It consists of two directives, bbtab and bbtabcontent, which can be placed anywhere on the page independently of one another - i.e., without needing a container for any particular part of the tab. In addition, it is also capable of accepting custom classes for active tabs, using the input `bbactiveclass`.

If you place all of your tabs in the same container, you can set `bbactiveclass` on the container, rather than the tabs themselves. If you do, the active class will be applied to whichever tab is active automatically.

You can also set `bbactiveclass` on the first child of the tab.

Custom classes take precedence as follows (in ascending order):

* Parent
* Tab
* Child

For example, if you have a custom active class set for a child, and one set at the parent, the child class will be applied.

You must also specify which tabset each tab and tabcontent element belongs to, using the input `bbtabset`. This allows you to use multiple tabsets on a single page.

For each tabset, use `bbactive=true` to indicate the default open tab.

#### Tab API Reference:

##### Inputs

|Name|Description|Type|Required|
|--- |--- |--- |-- |
|**bbtab**|Turns any element into a tab. Requires a value. All **immediate** children will become sortable elements.|string|yes|
|**bbtabset**|Specify the tabset each tab belongs to|string|yes|
|bbactiveclass|Optional class to apply to a tab when it is active|string|no|

##### Event Emitters

|Name|Description|Output|
|--- |--- |--- |
|bbshowstart|Emitted the moment a tab is clicked.|Tab name (value of bbtab):_string_|
|bbshowend|Emitted when a tab's associated tabcontent is visible|Tab name (value of bbtab):_string_|

#### Tabcontent API Reference:

##### Inputs

|Name|Description|Type|Required|
|--- |--- |--- |-- |
|**bbtabcontent**|Turns any element into a tab. Requires a value, which must match `bbtab` for the associated tab.|string|yes|
|**bbtabset**|Specify the tabset each tab belongs to|string|yes|

##### Event Emitters

None at this time. Use the tab's event emitters to handle showing and hiding tab content.

#### Example:

```html
<nav>
    <a bbtab="tab1" bbactive="true" bbtabset="tabset1">Tab 1</a>
    <a bbtab="tab2" bbtabset="tabset1">Tab 2</a>
</nav>
<br/>
<div bbtabcontent="tab1" bbtabset="tabset1">
    Tab 1 contents
</div>

<div bbtabcontent="tab2" bbtabset="tabset1">
    Tab 2 contents
</div>
```

## Contributing

Feel free to create pull requests and submit issues.
