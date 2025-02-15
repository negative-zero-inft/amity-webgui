<script lang="ts">

    import { isChatInfo } from "$lib/scripts/chatViews";
    let animatedSidebar: number = 0;

    $: {
        if($isChatInfo){
            animatedSidebar = 320;
        }else{
            animatedSidebar = 0;
        }
    }
</script>

{#if $isChatInfo}
    <hr class="separator"/>
{/if}
<div class="bar" style="--w: {animatedSidebar}px">
    chat info
</div>

<style lang="scss">

    .bar{
        transition: 0.25s ease 0s;
        width: var(--w);
        height: 100%;
        overflow: hidden;
        flex-shrink: 0;
    }
</style>