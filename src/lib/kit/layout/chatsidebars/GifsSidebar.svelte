<script lang="ts">

    import { isGifBar } from "$lib/scripts/chatViews";
    let animatedSidebar: number = 0;

    $: {
        if($isGifBar){
            animatedSidebar = 320;
        }else{
            animatedSidebar = 0;
        }
    }
</script>

{#if $isGifBar}
    <hr class="separator"/>
{/if}
<div class="bar" style="--w: {animatedSidebar}px">
    gifs
</div>

<style lang="scss">

    .bar{
        transition: 0.25s ease 0s;
        width: var(--w);
        height: 100%;
        overflow: hidden;
    }
</style>