<script>
import ScrollableArrow from '$lib/ScrollableArrow.svelte'
import ScrollableArrowItem from '$lib/ScrollableArrowItem.svelte'

const images = [
  "https://images.themecloset.pictures/assets/blogs/images/1280/_59e28442-8efc-41aa-887b-1f5a3bd24c21-main1.webp",
  "https://images.themecloset.pictures/assets/blogs/images/700/_40d4f232-6bcb-4885-aab6-3b7e88b4e7cf-label_mockup_3.webp",
  "https://images.themecloset.pictures/assets/blogs/images/700/_d7719529-dbbb-40ff-bb64-d13bf5299f74-1c0a232e-0687-4725-a1fb-888c252bfe94-_DSC0673.webp",
  "https://images.themecloset.pictures/assets/blogs/images/700/_87c290f7-8ad7-41c1-8d54-3e04dc869a73-ad8b3037-68b8-4c6e-b417-f338696aa4d1-_DSC0716.webp",
  "https://images.themecloset.pictures/assets/blogs/images/700/_70eca2b2-f045-4a3c-8800-bf910b4f6221-themecloset.webp",
  "https://images.themecloset.pictures/assets/blogs/images/700/_02b97241-7e14-491a-8c16-b8b0ba5b2f28-498127fe-6397-4019-8e77-fc2434d10659-mockup%20(1).webp",
]
</script>

<ScrollableArrow on:dragStart="{( () => {
  console.log("d")
  })}"  on:dragEnd="{( () => {
    console.log("d")
    })}" arrowPosition="outside-top-right" arrowShadow="{false}">
  {#each images as item}
    <ScrollableArrowItem style="padding:0px 10px;">
      <a href="https://themecloset.com"><div class="example" style="background-image:url('{item}')">
      </div>
      </a>
    </ScrollableArrowItem>
  {/each}
</ScrollableArrow>

<style>
:global(html){background-color:#222;}
.example{width:400px;height:400px;background-size:cover;background-position:center;}
.example img{width:100%;display:block;}
</style>
