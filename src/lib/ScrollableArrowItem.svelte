<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';
export { classNames as class }
export let id : string = '';
export let style : string = '';

const dispatch = createEventDispatcher();

let classNames : string = '';
let isVisible : boolean  = false

let itemElement : HTMLElement | null;
let parentElement : HTMLElement | null;

function isScrolledIntoView(): boolean {
  const elementRect = itemElement ? itemElement.getBoundingClientRect() : null
  const containerRect = parentElement ? parentElement.getBoundingClientRect() : null

  if(elementRect === null || containerRect === null) return false

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

  let onClickDrag = false

  if(itemElement){
    parentElement = itemElement.closest('.scroll_area')

    itemElement.addEventListener('click', (e) => {
      if(onClickDrag){
        e.preventDefault()
        onClickDrag = false
      }
    })
    itemElement.addEventListener('dragstart', (e) => {
      e.preventDefault()
      onClickDrag = true
    })
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
<div bind:this="{itemElement}" class="{isVisible ? 'visible' : ''} {classNames ? classNames : ''} item" id="{id != "" ? id :undefined}" style="{style != "" ? style : undefined}">
  <slot/>
</div>
<style>
.item{
  user-select: none; /* Standard syntax */}
</style>
