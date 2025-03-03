<script lang="ts">
	import BottomBar from "./chatViewComponents/BottomBar.svelte";
	import MessageList from "./chatViewComponents/MessageList.svelte";
	import TopBar from "./chatViewComponents/TopBar.svelte";


</script>

<div class="chatView">
    <TopBar/>
    <hr class="separator"/>
    <MessageList/>
    <hr class="separator"/>
    <BottomBar/>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .chatView{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .separator{
        width: 100%;
    }
</style>