<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	

	const dispatch = createEventDispatcher();

	interface Props {
		id?: string;
		style?: string;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let {
		id = '',
		style = '',
		class: classNames = '',
		children
	}: Props = $props();
	let isVisible: boolean = $state(false);

	let itemElement: HTMLElement | null = $state(null);
	let parentElement: HTMLElement | null = null;

	function isScrolledIntoView(): boolean {
		const elementRect = itemElement ? itemElement.getBoundingClientRect() : null;
		const containerRect = parentElement ? parentElement.getBoundingClientRect() : null;

		if (elementRect === null || containerRect === null) return false;

		if (elementRect.right >= containerRect.left && elementRect.left <= containerRect.right) {
			dispatch('visible');
			return true;
		} else {
			dispatch('invisible');
			return false;
		}
	}

	onMount(() => {
		let onClickDrag = false;

		if (itemElement) {
			parentElement = itemElement.closest('.scroll_area');

			itemElement.addEventListener('click', (e) => {
				if (onClickDrag) {
					e.preventDefault();
					onClickDrag = false;
				}
			});
			itemElement.addEventListener('dragstart', (e) => {
				e.preventDefault();
				onClickDrag = true;
			});
		}

		isVisible = isScrolledIntoView();

		if (!parentElement) {
			throw new Error(
				'Cannot find the containing scroll area. Visible, and invisible events may not work.'
			);
		} else {
			parentElement.addEventListener('scroll', () => {
				isVisible = isScrolledIntoView();
			});
		}
	});
</script>

<div
	bind:this={itemElement}
	class="{isVisible ? 'visible' : ''} {classNames ? classNames : ''} item"
	id={id != '' ? id : undefined}
	style={style != '' ? style : undefined}
>
	{@render children?.()}
</div>

<style>
	.item {
		user-select: none; /* Standard syntax */
	}
</style>
