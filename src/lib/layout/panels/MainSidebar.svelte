<script lang="ts">
	import SidebarTop from "$lib/layout/panels/mainSidebarElements/SidebarTop.svelte";
	import ChatList from "$lib/layout/panels/mainSidebarElements/ChatList.svelte";

</script>

<div class="sidebar">
    <SidebarTop/>
    <hr class="separator"/>
    <ChatList/>
</div>

<style lang="scss">

	@use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .sidebar{
        @include v.sidebar;
        width: 320px;
        height: 100vh;
    }
</style>