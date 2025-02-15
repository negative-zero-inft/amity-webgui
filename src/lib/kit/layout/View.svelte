<script lang="ts">
	import CloudStorageBar from "./chatsidebars/CloudStorageSidebar.svelte";
	import CommandSidear from "./chatsidebars/CommandSidear.svelte";
	import ContactsSidebar from "./chatsidebars/ContactsSidebar.svelte";
    import EmojiSidebar from "./chatsidebars/EmojiSidebar.svelte";
	import GifsSidebar from "./chatsidebars/GifsSidebar.svelte";
	import MapSidebar from "./chatsidebars/MapSidebar.svelte";
	import PollSidebar from "./chatsidebars/PollSidebar.svelte";
	import StickerSidebar from "./chatsidebars/StickerSidebar.svelte";
	
    import ViewBottomBar from "./ViewBottomBar.svelte";
	import ViewTopBar from "./ViewTopBar.svelte";

</script>

<div class="view">
    <ViewTopBar />
    <hr class="separator"/>
    <div class="subView">
        <CloudStorageBar></CloudStorageBar>
        <div class="userView">
            <div class="chatView">я насрал в турбину самолета</div>
            <hr class="separator"/>
            <ViewBottomBar />
        </div>
        <ContactsSidebar></ContactsSidebar>
        <MapSidebar></MapSidebar>
        <PollSidebar></PollSidebar>
        <CommandSidear></CommandSidear>
        <EmojiSidebar></EmojiSidebar>
        <StickerSidebar></StickerSidebar>
        <GifsSidebar></GifsSidebar>
    </div>
    
</div>

<style lang="scss">

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