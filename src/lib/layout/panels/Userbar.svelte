<script lang="ts">
	import UserbarTop from "$lib/layout/panels/userbarElements/UserbarTop.svelte";
	import { isUserBar } from "$lib/scripts/chatViews";
	import UserbarBottom from "./userbarElements/UserbarBottom.svelte";
	import UserbarElems from "./userbarElements/UserbarElems.svelte";

</script>

<div 
    class="userbar"
    style="
        left: {$isUserBar ? 0 : -320}px;
    "
>
    <UserbarTop/>
    <hr class="separator"/>
    <UserbarElems/>
    <UserbarBottom/>
</div>

<style lang="scss">
    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .userbar{
        @include v.sidebar;
        background-color: c.$bg;
        position: absolute;
        top: 0;
        left: 0;
        width: 320px;
        height: 100vh;
        z-index: 2137420;
        transition: 0.25s;
    }
</style>