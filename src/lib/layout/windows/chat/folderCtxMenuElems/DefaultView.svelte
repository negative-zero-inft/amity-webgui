<script lang="ts">

    let {
        height = $bindable(0),
        width = $bindable(0)
    }: {
        height: number,
        width: number
    } = $props();
</script>

<div 
    class="defaultView"
    bind:clientHeight={height}
    bind:clientWidth={width}
>

</div>

<style lang="scss">

</style>