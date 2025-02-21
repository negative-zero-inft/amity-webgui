<script lang="ts">
	import Button from "../Button.svelte";
    import { isSettings } from "$lib/scripts/chatViews";
    import Icon from "../Icon.svelte";

</script>

<div class="bg">
    <div class="settingsWindow">
        <Button action={() =>{isSettings.set(false)}}><Icon name="X"></Icon></Button>
    </div>
</div>

<style lang="scss">

	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;
    .settingWindow{
        padding: v.$spacing-def;
        background-color: c.$bg;
        border-radius: v.$corner-window;
        border: solid;
        border-color: c.$text-25;
    }

    .bg{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 6969696969;
        background-color: c.$bg-25;
        backdrop-filter: blur(80px);
        -webkit-backdrop-filter: blur(80px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>