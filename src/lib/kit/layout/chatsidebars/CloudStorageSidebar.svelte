<script lang="ts">

    import { isCloudStorageBar } from "$lib/scripts/chatViews";
    let animatedSidebar: number = 0;

    $: {
        if($isCloudStorageBar){
            animatedSidebar = 320;
        }else{
            animatedSidebar = 0;
        }
    }
</script>

<div class="bar" style="--w: {animatedSidebar}px">
    cloud storage
</div>
{#if $isCloudStorageBar}
    <hr class="separator"/>
{/if}

<style lang="scss">

    .bar{
        transition: 0.25s ease 0s;
        width: var(--w);
        height: 100%;
        overflow: hidden;
    }
</style>