<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';
import Arrow from '$lib/Arrow.svelte'
import isHex from '$lib/utils/isHex.js'
import isRGBA from '$lib/utils/isRGBA.js'

export let shadowColor : string = "rgba(0,0,0,0.5)";
export let arrowColor : string = "#222";
export let arowSize : number = 18;
export let threshold: number = 0;

export let style: string = '';

if(typeof arowSize != 'number') throw new Error("Arrow size should be only number.")
if(isRGBA(shadowColor) === false) throw new Error("Shadow Color should only be a rgba format `rgba(0,0,0,0.5)`.")
if(isHex(arrowColor) === false) throw new Error("Arrow color should be only hex.")
if(typeof threshold != 'number') throw new Error("Threshold should be number.")

export { classNames as class }

const dispatch = createEventDispatcher();

let classNames : string = '';
let scrollable : HTMLElement;

let showLeft : boolean  = false;
let showRight : boolean  = true;
let mouseOnScrollView : boolean = false;


let scrollThreshold : number = 0 // moved inside onMount due to window.

const validateArrows = () : void => {

  if(scrollable){
    if(scrollable.scrollLeft > 30){
      showLeft = true
    }else{
      showLeft = false
    }
    if((scrollable.scrollWidth - scrollable.offsetWidth) - scrollable.scrollLeft <= 60){
      showRight = false
    }else{
      showRight = true
    }
  }

}

const scrollTo = (value: number) :void => {

  scrollable.scrollTo({
    left: value,
    behavior: 'smooth' // This makes the scrolling smooth
  });
  dispatch('scroll')

}

const moveToRight = () : void => {
  let scrollValue : number = scrollable.scrollLeft + (scrollThreshold)
  // goes for 3/1 scroll of page width
  if((scrollable.scrollWidth - scrollable.scrollLeft) < 250){
    // if it only has 250 px to go, just go full
    scrollValue = scrollable.scrollWidth
  }
  scrollTo(scrollValue)
}
const moveToLeft = () :void => {
  let scrollValue : number = scrollable.scrollLeft - (scrollThreshold)
  // goes for 3/1 scroll of page width
  if(scrollable.scrollLeft < 250){
    // if it only has 250 px to go, just go full
    scrollValue = 0
  }
  scrollTo(scrollValue)
}
onMount( () :void => {
  scrollThreshold = threshold === 0 || threshold < 0 ? window.innerWidth / 3 : threshold

  scrollable.addEventListener('scroll', () => {
    validateArrows()
  })
  window.addEventListener('resize', () => {
    validateArrows()
  })
  window.addEventListener('keydown', (e:KeyEvent) => {

      if(e.code === 'ArrowLeft' || e.code === 'ArrowRight'){
        e.preventDefault()
      }
      if(mouseOnScrollView){ // works only when mouse is over the container
        if(e.code === 'ArrowLeft') moveToLeft()
        if(e.code === 'ArrowRight') moveToRight()
      }


  })
})
</script>

<div style="{style ? style : undefined}" class="{classNames ? classNames : ''} scroll_view_container">
    {#if showLeft}
      <div class="left arrow_container" style="background-image: linear-gradient(to left, rgba(255, 255, 255, 0), {shadowColor});">
        <div role="button" class="arrow" on:click="{moveToLeft}" tabindex="0" on:keydown="{moveToLeft}">
          <Arrow color="#fff" size="{arowSize.toString()}px" direction="left"/>
        </div>
      </div>
    {/if}
    {#if showRight}
      <div class="right arrow_container" style="background-image: linear-gradient(to right, rgba(255, 255, 255, 0), {shadowColor});">
        <div role="button" class="arrow" on:click="{moveToRight}" tabindex="0" on:keydown="{moveToRight}">
          <Arrow color="#fff" size="{arowSize.toString()}px" direction="Right"/>
        </div>
      </div>
    {/if}
    <div class="scroll_area" bind:this="{scrollable}" on:mouseenter="{( () => {
        mouseOnScrollView = true
      })}" on:mouseleave="{( () => {
          mouseOnScrollView = false
        })}">
      <div class="content">
        <slot />
      </div>
  </div>
</div>

<style>
.content{display:flex; align-items: center}
.scroll_view_container{position:relative;}
.scroll_area{overflow:scroll;position:relative;width:100%;}
.scroll_area::-webkit-scrollbar {display:none}
.arrow_container{z-index:9999;width:90px;height:100%;position:absolute;top:0px;cursor:pointer}
.scroll_view_container .left{left:0px;padding-left:15px;}
.scroll_view_container .right{right:0px;padding-right:15px}
.scroll_view_container .right .arrow{float:right;}
.scroll_view_container .arrow{position:relative;top:50%;transform:translateY(-50%)}
</style>
