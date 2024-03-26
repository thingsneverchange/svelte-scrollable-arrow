<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';
export { classNames as class }
export let id : string = '';
export let style : string = '';

const dispatch = createEventDispatcher();

let classNames : string = '';
let isVisible : boolean  = false

let itemElement : HTMLElement;
let parentElement : HTMLElement;

function isScrolledIntoView(): boolean {
  const elementRect = itemElement.getBoundingClientRect()
  const containerRect = parentElement.getBoundingClientRect()

  if(
    elementRect.right >= containerRect.left &&
    elementRect.left <= containerRect.right
  ){
    dispatch('visible')
    return true
  }else{
    dispatch('invisible')
    return false
  }
}


onMount( () => {
  if(itemElement){
    parentElement = itemElement.closest('.scroll_area')
  }
  isVisible = isScrolledIntoView()
  if(! parentElement){
    throw new Error('Cannot find the containing scroll area. Visible, and invisible events may not work.')
  }else{
    parentElement.addEventListener('scroll', () => {
      isVisible = isScrolledIntoView()
    })
  }
})

</script>
{isVisible}
<div bind:this="{itemElement}" class="{classNames ? classNames : ''} item" id="{id != "" ? id :undefined}" style="{style != "" ? style : undefined}">
  <slot/>
</div>
