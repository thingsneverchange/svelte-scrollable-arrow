<script lang="ts">
  export let color : string = '#222';
  export let size : string | number = '14px';
  export let direction : string = 'right';
</script>
<svg class="{direction}" fill="{color}" width="{size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.56 67.56"><defs></defs><g><g><polygon fill="{color}" points="33.72 0 29.28 5.64 57.12 30.48 0 30.48 0 37.08 57.12 37.08 29.28 62.04 33.72 67.56 70.56 33.84 70.56 33.72 33.72 0"/></g></g></svg>
<style>
.left{transform:rotate(-180deg)}
.bottom{transform:rotate(-270deg)}
.top{transform:rotate(270deg)}
.corner-right-top{transform:rotate(-45deg)}
</style>
