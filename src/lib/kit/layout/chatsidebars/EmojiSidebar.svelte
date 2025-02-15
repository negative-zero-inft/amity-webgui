<script lang="ts">

    import { isEmojiBar } from "$lib/scripts/chatViews";
    let animatedSidebar: number = 0;

    $: {
        if($isEmojiBar){
            animatedSidebar = 320;
        }else{
            animatedSidebar = 0;
        }
    }
</script>

{#if $isEmojiBar}
    <hr class="separator"/>
{/if}
<div class="bar" style="--w: {animatedSidebar}px">
    emoji
</div>

<style lang="scss">

    .bar{
        transition: 0.25s ease 0s;
        width: var(--w);
        height: 100%;
        overflow: hidden;
    }
</style>