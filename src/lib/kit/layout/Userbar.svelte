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
        <Button><Icon name="User"></Icon> Your profile</Button>
    </div>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use '$lib/style/variables.scss' as v;

    .options{
        display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		padding: v.$spacing-def;
		overflow-y: scroll;
		flex-grow: 1;
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