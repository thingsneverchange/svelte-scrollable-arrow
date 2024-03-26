<script lang="ts">
export { classNames as class }
let classNames : string = '';

</script>
<div class="{classNames ? classNames : ''} item">
  <slot/>
</div>
