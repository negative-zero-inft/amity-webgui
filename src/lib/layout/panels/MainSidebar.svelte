<script lang="ts">
	import SidebarTop from "$lib/layout/panels/mainSidebarElements/SidebarTop.svelte";
	import ChatList from "$lib/layout/panels/mainSidebarElements/ChatList.svelte";
	import Userbar from "$lib/layout/panels/Userbar.svelte";
    import { isUserBar } from "$lib/scripts/chatViews";

</script>

<Userbar/>
<div 
    class="sidebar"
    style="
        --u: {$isUserBar ? 0.9 : 1};
		--o: {$isUserBar ? 0.25 : 1}; 
		left: {$isUserBar ? -50 : 0}px;
        width: {$isUserBar ? 320 : 320}px;
		transition: width {$isUserBar ? 0.25 : 0}s, scale 0.25s, transform 0.25s, opacity 0.25s, left 0.25s;
    "
>
    <SidebarTop/>
    <hr class="separator"/>
    <ChatList/>
</div>

<style lang="scss">

	@use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .sidebar{
        @include v.sidebar;
        min-width: 320px;
        max-width: 50vw;
        height: 100vh;
        opacity: var(--o);
		scale: var(--u);
        resize: horizontal;
        position: relative;
    }
</style>