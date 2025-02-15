<script lang="ts">
	import ViewBottomBar from "./ViewBottomBar.svelte";
	import ViewTopBar from "./ViewTopBar.svelte";
</script>

<div class="view">
    <ViewTopBar />
    <hr class="separator"/>
    <div class="chatView">я насрал в турбину самолета</div>
    <hr class="separator"/>
    <ViewBottomBar />
</div>

<style lang="scss">
    .chatView{
        height: 100%;
        width: 100%;
        overflow: scroll;
        display: flex;
        flex-direction: column-reverse;
    }
    
    .view{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>