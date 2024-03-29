## 1.2.6

1. Changed the default arrow threshold to `window.innerWidth - 50` for narrow screens.
2. Added an explanation about the `Smooth Scrolling` option on Firefox.

## 1.2.4

1. Added a measurement to remove the content highlight (user select).
2. Added a measurement for the image and link ghosting on drag. To fix this, we moved the `drag` event inside the `mouse` event. `dragStart` and `dragEnd` still work the same.
3. Changed the `reachedEnd` threshold to 30ms
4. Bug where the scroll event hang leaving 100~200px left has been fixed.

## 1.2.0

1. Dispatch `dragStart` and `dragEnd` (mobile/desktop)
2. Added `reachedNearEnd` that fires when there's only one arrow to go.
3. Added `load` that fires when the component is mounted.
4. Fixed bug where the scrollbar appears on Firefox, Safari & Mobile Safari.
5. Changed the default scroll threshold to `1/2` from `1/3` on smaller devices.


## 1.1.4

1. Drag direction was set backwards.

## 1.1.3

1. `.scroll_view_shadow` class was mistakenly attached to container when it should be attahced to the arrow.
2. ID was not setting as `id == "" ? id : ""` should be `id != "" ? id : ""`.
3. Fixed the issue where the arrow gets triggered by a keyboard after a click on it.

## 1.1.0

1. ID was visible even when there's no value set up.
2. Added a new `drag event` for the desktop.
3. Added props for `___scrollTo` `(value: number, props?: { behavior: 'auto' | 'smooth'  }) => void`
4. Changed arrow positions from `20px` to `15px` for each.
5. Fixed the remaining shadow block issue when the shadow is disabled.
6. Added `.scroll_view_shadow` to the container when `arrowShadow` is enabled.
