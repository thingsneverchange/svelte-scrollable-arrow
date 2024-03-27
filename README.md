<div align="center" style="text-align:center">
  <img src="https://images.themecloset.pictures/github/scrollable-arrow/logo.png" alt="Svelte Scrollable Arrow" width="350" />
  <h1>Svelte Scrollable Arrow </h1>
  <a href="https://npmjs.org/package/svelte-scrollable-arrow">
    <img src="https://badgen.now.sh/npm/v/svelte-scrollable-arrow" alt="version" />
  </a>

</div>

Svelte Scrollable Arrow effortlessly creates a horizontal navigation with sleek arrows for contents that require responsiveness. It aims to keep every child element as it is while wrapping with a scrollable container and a navigation.

## Problem It Solves
Images, menus, and buttons can get unmanageable, requiring one to write a separate grid, list, or menus for wider and smaller devices. It solves this issue. You can still stuff all the menus or images in one line by making them scrollable.

## Compatibility
This component works seamlessly on any device, including mobile, tablet, or desktop. It efficiently handles various scroll triggers, thanks to its utilization of the [scroll event](https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event),

- Mouse wheels ✨
- Keyboard arrow events ✨ (Only if mouse is over the container to prevent every instance from listening to this event)
- Built-in arrows (←/→) ✨
- Touchevents ✨

And of course, this component is type-safe.

## Demo

 <img src="https://images.themecloset.pictures/github/scrollable-arrow/preview.gif" alt="Svelte Scrollable Arrow" width="100%" />

[Try on a website✨ (Click the search input)](https://themecloset.com "Try on our website").

## Mobile Preview
<div style="text-align:center">
<img src="https://images.themecloset.pictures/github/scrollable-arrow/iphone-preview.gif" alt="Svelte Scrollable Arrow" style="max-width:300px" /></div>

## Responsive
Automatically hides/shows arrows depending on the container size.
<img src="https://images.themecloset.pictures/github/scrollable-arrow/responsive-preview-2.gif" width="100%"/>

## Installation

```bash
npm install svelte-scrollable-arrow
```
```javascript
import {ScrollableArrow, ScrollableArrowItem} from 'svelte-scrollable-arrow'
```

## Usage guide
All you have to do is to wrap each of your images, buttons or texts with `<ScrollableArrowItem></ScrollableArrowItem>` inside the `<ScrollableArrow></ScrollableArrow>` container. Items can be multiple. You can use the loop `{#each}{/each}` block and it may be wise to assign a key for each item.

```html
<script>
  import {ScrollableArrow, ScrollableArrowItem} from 'svelte-scrollable-arrow'
</script>

<ScrollableArrow>
  <ScrollableArrowItem>
   <div>
		<!-- item -->
	</div>
  </ScrollableArrowItem>
  <ScrollableArrowItem>
    <div>
		<!-- item -->
	</div>
  </ScrollableArrowItem>
  <ScrollableArrowItem>
    <div>
		<!-- item -->
	</div>
  </ScrollableArrowItem>
  <ScrollableArrowItem>
    <div>
		<!-- item -->
	</div>
  </ScrollableArrowItem>
</ScrollableArrow>

```

## Props for Container (ScrollviewArrow)

| Prop                   | Type      | Default         | Description                                                    |
| ---------------------- | --------- | --------------- | -------------------------------------------------------------- |
| justifyContent                  |  `"start"⎮"end"⎮"flex-start"⎮"flex-end"⎮"center"⎮"left"⎮"right"⎮"normal"⎮"space-between"⎮"space-around"⎮"space-evenly"⎮"stretch`     | `"start"`      | Basically the same as `justify-content`. Sets how the items are aligned horizontally.             |
| alignItems                  |  `"normal"⎮ "flex-start"⎮"flex-end"⎮"center"⎮"start"⎮"end"⎮"self-start"⎮"self-end"⎮"baseline"⎮"first baseline"⎮"last baseline"⎮"stretch"⎮"safe"⎮"unsafe"`| `"center"` | Basically same as `align-items`. Sets how the items are aligned vertically.             |
| arrowShadow                  | `boolean`   | `true`            | Enables the shadow behind each arrow. If disabled, ShadowColor has no effect.                  |
| arrowShadowColor                  | `string`   | `"rgba(0,0,0,0.5)"`            | Only accepts a RGBA color for the shadow behind each arrow.                  |
| arrow                  | `boolean`     | `true`          | Show the arrow on and off                                         |
| arrowColor                  | `string`     | `"#ffffff"`          | Hex Color for the arrow                                          |
| arowSize                  | `number`     |  `18`          | Size of each arrow (px)                                          |
| arrowPosition        | `"top" ⎮ "center" ⎮ "bottom'"`     |  `"center"`          | 	The position for each arrow.                              |
| threshold                  | `number`     |  `0`          | The number of the scroll value required to move through container. If left unset, the default is set to 1/3 of the container's width.                              |
| showArrowByDefault                  | `boolean`     |  `true`          |  Shows the `right arrow` button on load, and it remains if the container has overflowing contents, and gets removed if it doesn't.                            |
| id                  | `string`     |  `""`          | 	ID for container.                              |
| class                  | `string`  | `""`            | Container classes    
| style                  | `string`  | `""`            | Container styles

## Props for Item (ScrollviewArrowItem)

| Prop                   | Type      | Default         | Description                                                    |
| ---------------------- | --------- | --------------- | -------------------------------------------------------------- |
| id                  | `string`     |  `""`          | 	ID for the item.                              |
| class                  | `string`  | `""`            | Item classes    
| style                  | `string`  | `""`            | Item styles

## Event for Container (ScrollviewArrow)

| Prop                   | Type          | Description                                                    |
| ---------------------- | --------- | -------------------------------------------------------------- |
| scroll                  | `CustomEvent`       | 	Fires when the scroll event in the container is fired. This also fires when a user scrolls through the container without clicking the arrow. (Keyboard arrows, touch gestures, and mouse wheels.) )                             |
| scrollStart                  | `CustomEvent`        | 	Fires once when the scroll event is fired. This is different from `scroll` as `scroll` fires on scroll.                             |
| scrollEnd                  | `CustomEvent`          | 	Fires 1 second after the scroll event is ended.                             |
| reachedEnd                  | `CustomEvent`         | 	Fires when the scroller reached at the end.                   |
| mouseenter                  | `CustomEvent`          | Fires when the mouse enters the container
| mouseleave                  | `CustomEvent`            | Fires when the mouse leaves the container
| next                  | `CustomEvent`       | Fires when the `next arrow` is fired. (Can be triggered with a keyboard arrow →.)
| prev                  | `CustomEvent`           | Fires when the `prev arrow` is fired. (Can be triggered with a keyboard arrow ←.)
| nav                  | `CustomEvent`         | Fires when either arrow is fired. (Can be triggered with keyboard arrows ←/→.)

## Event for Item (ScrollviewArrowItem)
The event in `ScrollviewArrowItem` is limited to two events `visible` and `invisible`. It doesn't handle any other event. You may consider adding the event to your item container, not this component.

| Prop                   | Type               | Description                                                    |
| ---------------------- | ---------  | -------------------------------------------------------------- |
| visible                  | `CustomEvent`             | Fires when the item is visible                             |
| invisible                  | `CustomEvent`           | Fires when the item is not visible

### Note about  the `showArrowByDefault` option.
This option is enabled by default. If you see the `right arrow` button showing up and disappearing immediately after, it means there are not enough scrollable contents. As it relies on the `onMount` lifecycle, this flickering is inevitable. You can disable it (not completely, but only when there are not enough contents to scroll) with this option. The recommended way is to make it `true` for smaller window sizes such as mobile, or tablets, and `false` for the wider views such as desktop.

## Limitations & Things to do

1. The component does not support custom arrow images, even though you can change the color & size.
2. You should wrap each item by `<ScrollableArrowItem/>` to make it work and be able to use the API of the component.
3. The layout may break if the items in the content don't have fixed a size (either width or height)

## Version Change LOG
[1.1.0](https://github.com/thingsneverchange/svelte-scrollable-arrow/blob/master/CHANGELOG.md?plain=1#110)

## License
[LIL License](https://github.com/thingsneverchange/svelte-scrollable-arrow/blob/master/License).

https://yongju.me
