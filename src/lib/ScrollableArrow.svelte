<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Arrow from '$lib/Arrow.svelte';
	import isHex from '$lib/utils/isHex.js';
	import isRGBA from '$lib/utils/isRGBA.js';

	type JustifyContent =
		| 'start'
		| 'end'
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'left'
		| 'right'
		| 'normal'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
		| 'stretch';

	type AlignItems =
		| 'normal'
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'start'
		| 'end'
		| 'self-start'
		| 'self-end'
		| 'baseline'
		| 'first baseline'
		| 'last baseline'
		| 'stretch'
		| 'safe'
		| 'unsafe';

	export let arrow: boolean = true;
	export let arrowColor: string = '#ffffff';
	export let arrowSize: number = 18;
	export let arrowPosition:
		| 'top'
		| 'center'
		| 'bottom'
		| 'outside-top-left'
		| 'outside-top-center'
		| 'outside-top-right'
		| 'outside-top-space-between' = 'center';
	export let arrowShadow: boolean = true;
	export let arrowShadowColor: string = 'rgba(0,0,0,0.7)';
	export let showArrowByDefault: boolean = true;

	export let threshold: number = 0;

	export let justifyContent: JustifyContent = 'start';
	export let alignItems: AlignItems = 'center';

	export let id: string = '';
	export let style: string = '';

	if (typeof arrowSize != 'number') throw new Error('Arrow size should be only number.');
	if (isRGBA(arrowShadowColor) === false)
		throw new Error('Shadow Color should be a rgba format `rgba(0,0,0,0.5)`.');
	if (isHex(arrowColor) === false) throw new Error('Arrow color should be hex `#ffffff`.');
	if (typeof threshold != 'number') throw new Error('Threshold should be number.');

	export { classNames as class };
	let classNames: string = '';

	const dispatch = createEventDispatcher();

	let _element_scrollable: HTMLElement;
	let _showLeft: boolean = false;
	let _showRight: boolean = showArrowByDefault ? true : false;
	let _mouseOnScrollView: boolean = false;
	let _scrollThreshold: number = 0; // moved inside onMount due to window.
	let _loaded = false;

	/** styles **/
	let _internal_style = `--scrollview-arrow-justify-content=${justifyContent};
          --scrollview-arrow-align-items=${alignItems};
          ${style != '' ? style + ';' : ''};`;

	if (arrowShadow) {
		_internal_style += `--scrollview-arrow-left-shadow: ${arrowShadowColor};`;
		_internal_style += `--scrollview-arrow-right-shadow: ${arrowShadowColor};`;
	} else {
		_internal_style += `--scrollview-arrow-left-shadow: rgba(255,255,255,0);`;
		_internal_style += `--scrollview-arrow-right-shadow: rgba(255,255,255,0);`;
	}
	/** styles **/

	/** validate arrows / Hide or show **/
	function __validateArrows(): void {
		let defaultThreshold = window.innerWidth < 900 ? window.innerWidth - 50 : window.innerWidth / 3;

		if (_element_scrollable) {
			if (_element_scrollable.scrollLeft > 30) {
				_showLeft = true;
			} else {
				_showLeft = false;
			}
			if (_element_scrollable.scrollWidth - _element_scrollable.offsetWidth - _element_scrollable.scrollLeft <= 60) {
				_showRight = false;
			} else {
				_showRight = true;
			}
		}

		_scrollThreshold = threshold === 0 || threshold < 0 ? defaultThreshold : threshold;
	}

	function __scrollTo(value: number, props?: { behavior: 'auto' | 'smooth' }): void {
		_element_scrollable.scrollTo({
			left: value,
			behavior: props?.behavior ? props.behavior : 'smooth' // This makes the scrolling smooth
		});
	}

	function __moveToRight(): void {
		let scrollValue: number = _element_scrollable.scrollLeft + _scrollThreshold;
		// goes for 3/1 scroll of page width
		if (_element_scrollable.scrollWidth - _element_scrollable.scrollLeft - window.innerWidth - _scrollThreshold < 200) {
			// if it only has 250 px to go, just go full
			scrollValue = _element_scrollable.scrollWidth;
		}
		__scrollTo(scrollValue);
		dispatch('next');
		dispatch('nav');
	}

	function __moveToLeft(): void {
		let scrollValue: number = _element_scrollable.scrollLeft - _scrollThreshold;
		// goes for 3/1 scroll of page width
		if (_element_scrollable.scrollLeft <= _scrollThreshold + 250) {
			// if it only has less than one arrow to go, just go full
			scrollValue = 0;
		}
		__scrollTo(scrollValue);
		dispatch('prev');
		dispatch('nav');
	}

	/// checks for scroll started, and ended
	let _scrollStarted = false;
	let _scrollStartTimer: ReturnType<typeof setTimeout> | null;
	function __scrollEventListener(): void {
		if (!_scrollStarted) {
			_scrollStarted = true;
			dispatch('scrollStart');
		} // fire scroll start

		if (_scrollStartTimer !== null) {
			clearTimeout(_scrollStartTimer);
		} //clear if any scroll start timer is set

		_scrollStartTimer = setTimeout(() => {
			dispatch('scrollEnd');
			__validateArrows();
			_scrollStarted = false;
		}, 30); // add a timer to listen for 1 seocnd of idleness
	}
	////

	function __mouseOverListener(hovered: boolean) {
		if (hovered) {
			dispatch('mouseenter');
			_mouseOnScrollView = true;
		} else {
			dispatch('mouseenter');
			_mouseOnScrollView = false;
		}
	}

	let _reched_end = false;
	let _reach_near_end = false;
	function __scrollCheckReachEnd() {
		let scrollRemaining = Math.abs(
			_element_scrollable.scrollWidth -
				_element_scrollable.scrollLeft -
				_element_scrollable.clientWidth
		);
		if (scrollRemaining < 1 && !_reched_end) {
			dispatch('reachedEnd');
			_reched_end = true;
		}
		// for reachedEnd -> Check if the reaming is bigger than the threshold, as it means there's on loop to go, and close to end.
		if (scrollRemaining < _scrollThreshold && _reach_near_end === false) {
			_reach_near_end = true;
			dispatch('reachedNearEnd');
		}
		if (scrollRemaining > _scrollThreshold) {
			_reach_near_end = false;
		}
		if (scrollRemaining > 5) {
			//this is necesarry as you don't know the direction.
			_reched_end = false;
		}
	}

	/// determine-arrow-position-and-class
	let arrowPositionClass = '';
	if (['top', 'center', 'bottom'].includes(arrowPosition)) {
		arrowPositionClass = 'default-arrow-position ' + arrowPosition;
	}
	if (arrowPosition.startsWith('outside')) {
		arrowPositionClass = 'outside-arrow-position ' + arrowPosition;
	}

	////

	onMount((): void => {
		dispatch('load');
		_loaded = true;
		__validateArrows();

		window.addEventListener('resize', (): void => {
			__validateArrows();
		});
		// assign threshold on mount

		//check if there's scroll to go if not disable right
		if (_element_scrollable.scrollWidth == _element_scrollable.clientWidth) {
			_showRight = false;
		} else {
			_showRight = true;
		}
		//check if there's scroll to go.

		_element_scrollable.addEventListener('scroll', (): void => {
			__scrollEventListener();
			__scrollCheckReachEnd();
			dispatch('scroll');
		});
		window.addEventListener('keydown', (e: KeyboardEvent): void => {
			if (_mouseOnScrollView) {
				if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
					e.preventDefault();
				} // works only when mouse is over the container

				if (e.code === 'ArrowLeft') __moveToLeft();
				if (e.code === 'ArrowRight') __moveToRight();
			}
		});

		/** drag event **/
		let onDargPosition: number = 0;
		let onDargScrollPosition: number = 0;
		let onDrag: boolean = false;
		let isMouseInside: boolean = false;
		_element_scrollable.addEventListener('mousedown', (): void => {
			onDrag = true;
			isMouseInside = true;
			if (onDrag) {
				dispatch('dragStart');
			}
		});
		window.addEventListener('mouseup', (): void => {
			if (onDrag) {
				dispatch('dragEnd');
				onDrag = false;
				onDargPosition = 0;
				onDargScrollPosition = 0;
			}
		});
		window.addEventListener('mousemove', (e): void => {
			if (onDrag && isMouseInside) {
				if (e.screenX !== 0 && _element_scrollable) {
					if (onDargPosition === 0) {
						onDargPosition = e.screenX;
						onDargScrollPosition = _element_scrollable.scrollLeft;
					} else {
						__scrollTo(onDargScrollPosition - (e.screenX - onDargPosition), {
							behavior: 'auto'
						});
					}
				}
			}
		});

		_element_scrollable.addEventListener('touchstart', (): void => {
			dispatch('dragStart');
		});
		_element_scrollable.addEventListener('touchend', (): void => {
			dispatch('dragEnd');
		});
	});
</script>

<div
	id={id != '' ? id : undefined}
	
	style={_internal_style}
	class="{classNames ? classNames : ''}
           {_loaded ? 'scroll_is_loaded' : ''}
           scroll_view_container"

	on:mouseenter={() => {
		__mouseOverListener(true);
	}}
	on:mouseleave={() => {
		__mouseOverListener(false);
	}}

	role="region"
	aria-label="Scroll View"
	aria-live="polite">

	<div class="arrow_container {arrowShadow ? 'scroll_view_shadow' : ''} {arrowPositionClass}">
		{#if _showLeft && arrow}
			<div class="left arrow">
				<button
					on:click={__moveToLeft}
					tabindex="0"
					on:keydown={() => {
						/// disabled becuase we have keyboard event
					}}>
					<Arrow color={arrowColor} size="{arrowSize.toString()}px" direction="left" />
				</button>
			</div>
		{:else}
			<div></div>
		{/if}
		{#if _showRight && arrow}
			<div class="right arrow">
				<button
					on:click={__moveToRight}
					tabindex="0"
					on:keydown={() => {
						/// disabled becuase we have keyboard event
					}}>
					<Arrow color={arrowColor} size="{arrowSize.toString()}px" direction="Right" />
				</button>
			</div>
		{:else}
			<div></div>
		{/if}
	</div>
	<div class="scroll_area" bind:this={_element_scrollable}>
		<div class="content">
			<slot />
		</div>
	</div>
</div>

<style>
	.scroll_view_container {
		position: relative;
	}
	.scroll_view_container button {
		background-color: transparent;
		padding: 0px;
		border: 0px;
		cursor: pointer;
	}
	.scroll_view_container .arrow_container {
		width: 100%;
		line-height: 100%;
	}
	.scroll_view_container .arrow_container.default-arrow-position .arrow {
		z-index: 9999;
		width: 0px;
		height: 100%;
		position: absolute;
		top: 0px;
	}
	.scroll_view_container .arrow_container.default-arrow-position .left {
		left: 0px;
		background-image: linear-gradient(
			to left,
			rgba(255, 255, 255, 0),
			var(--scrollview-arrow-left-shadow)
		);
	}
	.scroll_view_container .arrow_container.default-arrow-position .right {
		right: 0px;
		background-image: linear-gradient(
			to right,
			rgba(255, 255, 255, 0),
			var(--scrollview-arrow-left-shadow)
		);
	}
	.scroll_view_container .arrow_container.default-arrow-position.scroll_view_shadow .arrow {
		width: 40px;
	}
	.scroll_view_container .arrow_container.default-arrow-position .right button {
		position: absolute;
		right: 15px;
	}
	.scroll_view_container .arrow_container.default-arrow-position .left button {
		position: absolute;
		left: 15px;
	}
	.scroll_view_container .arrow_container.default-arrow-position.top button {
		top: 10px;
	}
	.scroll_view_container .arrow_container.default-arrow-position.center button {
		top: 50%;
		transform: translateY(-50%);
	}
	.scroll_view_container .arrow_container.default-arrow-position.bottom button {
		bottom: 10px;
	}
	.scroll_view_container .arrow_container.outside-arrow-position .left,
	.scroll_view_container .arrow_container.outside-arrow-position .right {
		margin-right: 3px;
		margin-left: 3px;
	}
	.scroll_view_container .arrow_container.outside-arrow-position {
		display: flex;
		padding: 10px 0px;
	}
	.scroll_view_container .arrow_container.outside-arrow-position.outside-top-left {
		justify-content: left;
	}
	.scroll_view_container .arrow_container.outside-arrow-position.outside-top-center {
		justify-content: center;
	}
	.scroll_view_container .arrow_container.outside-arrow-position.outside-top-right {
		justify-content: right;
	}
	.scroll_view_container .arrow_container.outside-arrow-position.outside-top-space-between {
		justify-content: space-between;
		order: 2;
	}
	.scroll_view_container .arrow_container.outside-arrow-position .arrow {
		display: inline-block;
		background-color: var(--scrollview-arrow-left-shadow);
		padding: 9px 10px;
		border-radius: 500px;
	}
	.scroll_view_container .scroll_area .content {
		display: flex;
		align-items: var(--scrollview-arrow-align-items);
		justify-content: var(--scrollview-arrow-justify-content);
	}
	.scroll_view_container .scroll_area {
		overflow: scroll;
		position: relative;
		width: 100%;
	}
	.scroll_view_container .scroll_area {
		/* Hide scrollbar for WebKit (Safari, Chrome) */
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch; /* Enables momentum scrolling on iOS */

		/* Hide scrollbar for Firefox */
		overflow-y: scroll;
		scrollbar-width: none;
	}
	.scroll_view_container .scroll_area {
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}

	/* Hide scrollbar for IE and Edge */
	.scroll_view_container .scroll_area::-webkit-scrollbar {
		display: none; /* Hide scrollbar for WebKit (Safari, Chrome) */
	}

	.scroll_view_container .scroll_area::-moz-scrollbar {
		display: none; /* Hide scrollbar for Firefox */
	}
</style>
