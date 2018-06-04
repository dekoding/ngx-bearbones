# NgxBearbones

A project to create bare-bones Angular widgets ready to be used with any CSS framework. (Bootstrap, Material, SemanticUI, etc.)

**Note**: The ngx-bearbones package currently contains three completed widgets, a drag-and-drop, a sortable, and tabs. I'm working as fast as I can to add more!

## Table of contents
1. [Bearbones Manifesto](#manifesto)
2. [Installation instructions](#installation-instructions)
3. [Documentation](#documentation)
3. [Troubleshooting](#troubleshooting)
4. [Contributing](#contribution)

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
```
import { BearbonesModule } from 'ngx-bearbones';

@NgModule({
  ...
  imports: [ BearbonesModule, ... ]
  ...
})
```

## Documentation

Use Bearbones widgets in your components.

### Sortable

A sortable widget emits an event `orderChanged` whenever an item has been moved:

#### Template

```HTML
<ul bbsortable="mysortable" (orderChanged)="orderChanged($event)">
    <li *ngFor="let item of myItems">{{item.name}}</li>
</ul>
```

#### Component

```typescript
orderChanged(event: any) {
    const { draggedItem, newPosition } = event;
    this.myItems.splice(newPosition, 0, this.myItems.splice(draggedItem, 1)[0]);
}
```

Or with custom classes...

#### Template
```HTML
<ul bbsortable="mysortable" (orderChanged)="orderChanged($event)" [bboptions]="myOptions">
    <li *ngFor="let item of myItems">{{item.name}}</li>
</ul>
```

#### Component

```typescript

myOptions = {
    restingClass: 'dropzone',
    hoverClass: 'dropzone-hover',
    holdingClass: 'dropper-holding'
};

orderChanged(event: any) {
    const { draggedItem, newPosition } = event;
    this.myItems.splice(newPosition, 0, this.myItems.splice(draggedItem, 1)[0]);
}
```

### Drag and drop

The drag-and-drop component consists of two directives, a dropzone target and a dropper. Both target and dropper can be any HTML element; I've intentionally made it as unrestrictive as possible, but that means it's up to you to make sure you haven't accidentally created a `<li>` dropper and a `<div>` drop target with the same name.

The directives `bbdropzone` and `bbdropper` must have the same value, or the dropper will be rejected.

#### Example with custom classes

```HTML
<ul>
    <li bbdropzone="thisdropper" bbdropzoneClass="dropzone" bbdropzoneHoverClass="dropzone-hover">
        <div bbdropper="thisdropper" bbdropperClass="dropper" bbholdingClass="dropper-holding">
            Styled dropper
        </div>
    </li>
    <li bbdropzone="thisdropper" bbdropzoneClass="dropzone" bbdropzoneHoverClass="dropzone-hover"></li>
    <li bbdropzone="thisdropper" bbdropzoneClass="dropzone" bbdropzoneHoverClass="dropzone-hover"></li>
</ul>
```

### Tabs

BearBones tabs allow you to display tabular data. It consists of two directives, bbtab and bbtabcontent,
which can be placed anywhere on the page independently of one another - i.e., without needing a container
for any particular part of the tab. In addition, it is also capable of accepting custom classes for
active tabs from the tab, the first child element of the tab, or the parent of the tab.

Use the "bbtabset" field to indicate which tabset tabs belong to (useful for pages with multiple tabsets).

Use "bbactive=true" to indicate the default open tab.

#### Template

```HTML
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

## Troubleshooting

Under construction! Please come back later...

## Contributing

Also under construction, but feel free to create pull requests!
