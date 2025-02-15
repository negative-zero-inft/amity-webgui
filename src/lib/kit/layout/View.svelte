<script lang="ts">
	
    import ViewBottomBar from "./ViewBottomBar.svelte";
	import ViewTopBar from "./ViewTopBar.svelte";

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

<div class="view">
    <ViewTopBar />
    <hr class="separator"/>
    <div class="subView">
        <div class="userView">
            <div class="chatView">я насрал в турбину самолета</div>
            <hr class="separator"/>
            <ViewBottomBar />
        </div>
        {#if $isEmojiBar}
            <hr class="separator"/>
        {/if}
        <div class="emojiBar" style="--w: {animatedSidebar}px">
        </div>
    </div>
    
</div>

<style lang="scss">

    .emojiBar{
        transition: 0.25s ease 0s;
        width: var(--w);
        height: 100%;
        overflow: hidden;
    }

    .userView{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .subView{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .chatView{
        height: 100%;
        width: 100%;
        overflow: scroll;
        display: flex;
        flex-direction: column-reverse;
    }
    
    .chatbox{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .view{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>