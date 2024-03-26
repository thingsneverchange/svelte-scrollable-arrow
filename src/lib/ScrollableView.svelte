<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte';
import Arrow from '$lib/Arrow.svelte'
import isHex from '$lib/utils/isHex.js'
import isRGBA from '$lib/utils/isRGBA.js'

type justifyContent = "start"|"end"|"flex-start"|"flex-end"|"center"|"left"|"right"|"normal"|"space-between"|"space-around"|"space-evenly"|"stretch"
type AlignItems = "normal"| "flex-start"|"flex-end"|"center"|"start"|"end"|"self-start"|"self-end"|"baseline"|"first baseline"|"last baseline"|"stretch"|"safe"|"unsafe"

export let justifyContent : justifyContent = "start";
export let alignItems : AlignItems = "center";
export let shadow : boolean = true
export let shadowColor : string = "rgba(0,0,0,0.5)";
export let arrow : boolean = true;
export let arrowColor : string = "#ffffff";
export let arrowSize : number = 18;
export let arrowPosition : 'top' | 'middle' | 'bottom' = 'middle';
export let id : string = "";
export let threshold: number = 0;

export let style: string = '';

if(typeof arrowSize != 'number') throw new Error("Arrow size should be only number.")
if(isRGBA(shadowColor) === false) throw new Error("Shadow Color should be a rgba format `rgba(0,0,0,0.5)`.")
if(isHex(arrowColor) === false) throw new Error("Arrow color should be hex `#ffffff`.")
if(typeof threshold != 'number') throw new Error("Threshold should be number.")

export { classNames as class }

const dispatch = createEventDispatcher();

let classNames : string = '';
let _element_scrollable : HTMLElement;

let _showLeft : boolean  = false;
let _showRight : boolean  = true;
let _mouseOnScrollView : boolean = false;
let _scrollThreshold : number = 0 // moved inside onMount due to window.

/** styles **/
let _internal_style = `--scrollview-arrow-justify-content=${justifyContent};
          --scrollview-arrow-align-items=${alignItems};
          ${style != "" ? style + ';' : ''};`

if(shadow){
  _internal_style += `--scrollview-arrow-left-shadow: ${shadowColor};`
  _internal_style += `--scrollview-arrow-right-shadow: ${shadowColor};`
}else{
  _internal_style += `--scrollview-arrow-left-shadow: rgba(255,255,255,0);`
  _internal_style += `--scrollview-arrow-right-shadow: rgba(255,255,255,0);`
}
/** styles **/

const __validateArrows = () : void => {

  if(_element_scrollable){
    if(_element_scrollable.scrollLeft > 30){
      _showLeft = true
    }else{
      _showLeft = false
    }
    if((_element_scrollable.scrollWidth - _element_scrollable.offsetWidth) - _element_scrollable.scrollLeft <= 60){
      _showRight = false
    }else{
      _showRight = true
    }
  }

}

const __scrollTo = (value: number) :void => {

  _element_scrollable.scrollTo({
    left: value,
    behavior: 'smooth' // This makes the scrolling smooth
  });

}

const __moveToRight = () : void => {
  let scrollValue : number = _element_scrollable.scrollLeft + (_scrollThreshold)
  // goes for 3/1 scroll of page width
  if((_element_scrollable.scrollWidth - _element_scrollable.scrollLeft) < 150){
    // if it only has 250 px to go, just go full
    scrollValue = _element_scrollable.scrollWidth
  }
  __scrollTo(scrollValue)
  dispatch('next')
  dispatch('nav')
}

const __moveToLeft = () :void => {
  let scrollValue : number = _element_scrollable.scrollLeft - (_scrollThreshold)
  // goes for 3/1 scroll of page width
  if(_element_scrollable.scrollLeft < 150){
    // if it only has 250 px to go, just go full
    scrollValue = 0
  }
  __scrollTo(scrollValue)
  dispatch('prev')
  dispatch('nav')
}

/// checks for scroll started, and ended
let _scrollStarted = false;
let _scrollStartTimer : ReturnType<typeof setTimeout> | null;
const __scrollEventListener = () :void => {

  if(! _scrollStarted){
    _scrollStarted = true
    dispatch('scrollStart')
  }// fire scroll start

  if(_scrollStartTimer !== null){
    clearTimeout(_scrollStartTimer)
  }//clear if any scroll start timer is set

  _scrollStartTimer = setTimeout( () => {
    dispatch('scrollEnd')
    _scrollStarted = false
  }, 1000)// add a timer to listen for 1 seocnd of idleness
}
////

const __mouseOverListener = (hovered: boolean) :void => {
  if(hovered){
    dispatch('mouseenter')
    _mouseOnScrollView = true
  }else{
    dispatch('mouseenter')
    _mouseOnScrollView = false
  }
}

let _reched_end = false
const __scrollCheckReachEnd = () => {
  let scrollRemaining = Math.abs(_element_scrollable.scrollWidth - _element_scrollable.scrollLeft - _element_scrollable.clientWidth)
  if(scrollRemaining < 1 && ! _reched_end ){
    dispatch('reachedEnd')
    _reched_end = true
  }
  if(scrollRemaining > 5){//this is necesarry as you don't know the direction.
    _reched_end = false
  }
}

onMount( () :void => {

  _scrollThreshold = threshold === 0 || threshold < 0 ? window.innerWidth / 3 : threshold // assign threshold on mount
  _element_scrollable.addEventListener('scroll', () => {

    __validateArrows()
    __scrollEventListener()
    __scrollCheckReachEnd()
    dispatch('scroll')

  })

  window.addEventListener('resize', () => {

    __validateArrows()

  })
  window.addEventListener('keydown', (e:KeyboardEvent) => {

      if(e.code === 'ArrowLeft' || e.code === 'ArrowRight'){
        e.preventDefault()
      }
      if(_mouseOnScrollView){ // works only when mouse is over the container
        if(e.code === 'ArrowLeft') __moveToLeft()
        if(e.code === 'ArrowRight') __moveToRight()
      }


  })
})


</script>

<div id="{id == "" ? id : ""}" style="{_internal_style}"
    class="{classNames ? classNames : ''} scroll_view_container" on:mouseenter="{( () => {
        __mouseOverListener(true)
      })}" on:mouseleave="{( () => {
          __mouseOverListener(false)
        })}" role="region" aria-label="Scroll View" aria-live="polite">
    {#if _showLeft && arrow}
      <div class="left arrow_container position-{arrowPosition}">
        <button class="arrow" on:click="{__moveToLeft}" tabindex="0" on:keydown="{__moveToLeft}">
          <Arrow color="{arrowColor}" size="{arrowSize.toString()}px" direction="left"/>
        </button>
      </div>
    {/if}
    {#if _showRight && arrow}
      <div class="right arrow_container position-{arrowPosition}">
        <button class="arrow" on:click="{__moveToRight}" tabindex="0" on:keydown="{__moveToRight}">
          <Arrow color="{arrowColor}" size="{arrowSize.toString()}px" direction="Right"/>
        </button>
      </div>
    {/if}
    <div class="scroll_area" bind:this="{_element_scrollable}">
      <div class="content">
        <slot />
      </div>
  </div>
</div>

<style>

.scroll_view_container{position:relative;}
.scroll_view_container button{background-color:transparent; padding:0px;border:0px;cursor:pointer}
.scroll_view_container .arrow_container{z-index:9999;width:90px;height:100%;position:absolute;top:0px;cursor:pointer}
.scroll_view_container .arrow_container.left{left:0px;padding-left:15px;background-image:linear-gradient(to left, rgba(255, 255, 255, 0), var(--scrollview-arrow-left-shadow))}
.scroll_view_container .arrow_container.right{right:0px;padding-right:15px;background-image:linear-gradient(to right, rgba(255, 255, 255, 0), var(--scrollview-arrow-left-shadow))}

.scroll_view_container .arrow_container.right .arrow{float:right;position:absolute;right:20px;}
.scroll_view_container .arrow_container.left .arrow{float:right;position:absolute;left:20px;}
.scroll_view_container .arrow_container.position-top .arrow{top:10px}
.scroll_view_container .arrow_container.position-middle .arrow{top:50%;transform:translateY(-50%)}
.scroll_view_container .arrow_container.position-bottom .arrow{right:20px;bottom:10px;}

.scroll_view_container .scroll_area .content{display:flex; align-items: var(--scrollview-arrow-align-items); justify-content: var(--scrollview-arrow-justify-content)}
.scroll_view_container .scroll_area{overflow:scroll;position:relative;width:100%;}
.scroll_view_container .scroll_area::-webkit-scrollbar {display:none}
</style>
