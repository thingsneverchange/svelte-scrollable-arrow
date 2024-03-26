<script>
import ScrollableArrow from '$lib/ScrollableArrow.svelte'
import ScrollableArrowItem from '$lib/ScrollableArrowItem.svelte'
</script>

<ScrollableArrow>
  <ScrollableArrowItem>
    <div class="example">
      <img src="https://images.themecloset.pictures/assets/blogs/images/1280/_59e28442-8efc-41aa-887b-1f5a3bd24c21-main1.webp" alt="Text example" />
    </div>
  </ScrollableArrowItem>

</ScrollableArrow>

<style>
.example{width:400px}
.example img{width:100%}
</style>
