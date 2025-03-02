<script lang="ts">
	import SidebarTop from "$lib/layout/panels/mainSidebarElements/SidebarTop.svelte";

</script>

<div class="sidebar">
    <SidebarTop/>
    <hr class="separator"/>
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