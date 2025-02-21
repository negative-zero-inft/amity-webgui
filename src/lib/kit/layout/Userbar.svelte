<script lang="ts">
	import Button from "../Button.svelte";
	import Icon from "../Icon.svelte";
	import UserbarTop from "./sidebarElems/UserbarTop.svelte";

    let {
        isExpanded
    } = $props()
</script>

<div class="bar" style="--w: {$isExpanded ? 320 : 0}px">
    <UserbarTop isExp={isExpanded}></UserbarTop>
    <hr class="separator"/>
    <div class="options">
        <div class="cluster">
            <Button alignment="space-between" width="100%"><div class="elem-horiz"><Icon name="User"></Icon> Your profile</div><Icon name="Direction/Right"></Icon></Button>
            <Button alignment="space-between" width="100%"><div class="elem-horiz"><Icon name="Users"></Icon> Your friends</div><Icon name="Direction/Right"></Icon></Button>
            <Button alignment="space-between" width="100%"><div class="elem-horiz"><Icon name="Library"></Icon> Your things</div><Icon name="Direction/Right"></Icon></Button>
        </div>
        <div class="cluster">
            <Button alignment="space-between" width="100%"><div class="elem-horiz"><Icon name="Bookmark"></Icon> Saved messages</div><Icon name="Direction/Right"></Icon></Button>
            <Button alignment="space-between" width="100%"><div class="elem-horiz"><Icon name="Archive"></Icon> Archived chats</div><Icon name="Direction/Right"></Icon></Button>
        </div>
        <div class="cluster">
            <Button alignment="space-between" width="100%"><div class="elem-horiz"><Icon name="Cloud"></Icon> About instance</div><Icon name="Direction/Right"></Icon></Button>
            <Button alignment="space-between" width="100%"><div class="elem-horiz"><Icon name="List"></Icon> Amity changelog</div><Icon name="Direction/Right"></Icon></Button>
        </div>
    </div>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use '$lib/style/variables.scss' as v;

    .elem-horiz{
        display: flex;
        gap: v.$spacing-def;
        align-items: center;
    }

    .options{
        width: 320px;
        display: flex;
		flex-direction: column;
		gap: 16px;
		padding-top: v.$spacing-def;
		padding-bottom: v.$spacing-def;
		overflow-y: auto;
        overflow-x: hidden;
		flex-grow: 1;
    }
    .cluster{
        display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		padding-right: v.$spacing-def;
		padding-left: v.$spacing-def;
		overflow: visible;
    }

    .bar{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 2137420;
        background-color: c.$bg;
        display: flex;
        flex-direction: column;
        @include v.sidebar();
    }
</style>