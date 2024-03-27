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
