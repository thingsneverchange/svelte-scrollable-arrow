<div align="center" style="text-align:center">
  <img src="https://images.themecloset.pictures/github/scrollable-arrow/logo.png" alt="Svelte Scrollable Arrow" width="250" />
  <h1>Svelte Scrollable Arrow </h1>
</div>

Svelte Scrollable Arrow effortlessly creates sleek arrows for horizontal navigation for contents that require responsiveness. It aims to keep every element as it is while wrapping the container, and making it scrollable with arrows or natively.

##Compatibility
It works gracefully on any device such as a mobile, table or desktop. It listenes to the eyboard event, touch event, and scroll event as this utilizes the [built-in document scroll event](https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event).

##Demos

 <img src="https://images.themecloset.pictures/github/scrollable-arrow/preview.gif" alt="Svelte Scrollable Arrow" width="100%" />

[Try on a website✨ (Click the search input)](https://themecloset.com "Try on our website").

##Mobile
On mobile, this basically works like a simple touchable scroll container as the component utlizes it.
<div style="text-align:center">
<img src="https://images.themecloset.pictures/github/scrollable-arrow/iphone-preview.gif" alt="Svelte Scrollable Arrow" style="max-width:300px" /></div>

## Installation

```bash
npm install svelte-scrollable-arrow
```
```javascript
import {ScrollableView, ScrollableViewItem} from 'svelte-scrollable-view'
```

## Props for Container (ScrollviewArrow)

| Prop                   | Type      | Default         | Description                                                    |
| ---------------------- | --------- | --------------- | -------------------------------------------------------------- |
| justifyContent                  |  `"start"⎮"end"⎮"flex-start"⎮"flex-end"⎮"center"⎮"left"⎮"right"⎮"normal"⎮"space-between"⎮"space-around"⎮"space-evenly"⎮"stretch`     | `start`      | Basically same as `justifyContent` CSS. Sets how the items are aligned horizontally.             |
| alignItems                  |  `"normal"⎮ "flex-start"⎮"flex-end"⎮"center"⎮"start"⎮"end"⎮"self-start"⎮"self-end"⎮"baseline"⎮"first baseline"⎮"last baseline"⎮"stretch"⎮"safe"⎮"unsafe"` | `center` | Basically same as `alignItems` CSS. Sets how the items are aligned horizontally.             |
| shadow                  | `boolean`   | `false`            | Enables the shadow behind each arrow. If disabled, ShadowColor has no effect.                  |
| shadowColor                  | `string`   | `rgba(0,0,0,0.5)`            | Only accepts a RGBA color for the shadow behind each arrow.                  |
| arrow                  | `boolean`     | `true`          | Show the arrow on and off                                         |
| arrowColor                  | `string`     | `#ffffff`          | Hex Color for the arrow                                          |
| arowSize                  | `number`     |  `18`          | Size of each arrow (px)                                          |
| arrowPosition        | `"top" ⎮ "center" ⎮ "bottom'"`     |  `center`          | 	The position for each arrow.                              |
| threshold                  | `number`     |  `0`          | The number of the scroll value required to move through container. If left unset, the default is set to 1/3 of the container's width.                              |
| id                  | `string`     |  `null`          | 	ID for container.                              |
| class                  | `string`  | `''`            | Container classes    
| style                  | `string`  | `''`            | Container styles

## Props for Item (ScrollviewArrowItem)

| Prop                   | Type      | Default         | Description                                                    |
| ---------------------- | --------- | --------------- | -------------------------------------------------------------- |
| id                  | `string`     |  `''`          | 	ID for the item.                              |
| class                  | `string`  | `''`            | Item classes    
| style                  | `string`  | `''`            | Item styles

## Event for Container (ScrollviewArrow)

| Prop                   | Type      | Default         | Description                                                    |
| ---------------------- | --------- | --------------- | -------------------------------------------------------------- |
| scroll                  | `string`     |  `''`          | 	Fires when scroll event in the container is fired. This also fires when a user scrolls through the container without clicking the arrow. (Keyboard, touch, and mouse) )                             |
| scrollStart                  | `string`     |  `''`          | 	Fires once when scroll event in the container is fired. This is different from `scroll` as `scroll` fires on scroll.                             |
| scrollEnd                  | `string`     |  `''`          | 	Fires when scroll event in the container is ended.                             |
| mouseenter                  | `string`  | `''`            | Fires when the mouse enters the container
| mouseleave                  | `string`  | `''`            | Fires when the mouse leaves the container
| next                  | `string`  | `''`            | Fies when the `next arrow` is fired. (Can be triggered with keyboard arrows ←/→.)
| prev                  | `string`  | `''`            | Fies when the `prev arrow` is fired. (Can be triggered with keyboard arrows ←/→.)
| nav                  | `string`  | `''`            | Fies when either arrow is fired. (Can be triggered with keyboard arrows ←/→.)

## Event for Item (ScrollviewArrowItem)

| Prop                   | Type      | Default         | Description                                                    |
| ---------------------- | --------- | --------------- | -------------------------------------------------------------- |
| visible                  | `string`     |  `''`          | 	Fires when the item is visible                             |
| invisible                  | `string`  | `''`            | Fires when the item is not visible

### Usage Guide

```html
<script>
  import {ScrollableView, ScrollableViewItem} from 'svelte-scrollable-view'
</script>

<ScrollableView>
  <ScrollableViewItem>
   <div>
		<!-- item -->
	</div>
  </ScrollableViewItem>
  <ScrollableViewItem>
    <div>
		<!-- item -->
	</div>
  </ScrollableViewItem>
  <ScrollableViewItem>
    <div>
		<!-- item -->
	</div>
  </ScrollableViewItem>
  <ScrollableViewItem>
    <div>
		<!-- item -->
	</div>
  </ScrollableViewItem>
</ScrollableView>

```
## Limitations & Things to do

1. Currently, the component does not support custom arrows, even though you can change the color & size
2. You should wrap each item by `<ScrollableViewItem/>` to make it work, and be able to use the API of the component.

## License
[LIL](https://github.com/thingsneverchange/svelte-scrollable-arrow/blob/master/License).
