<script lang="ts">
	import Button from "../Button.svelte";
	import Icon from "../Icon.svelte";
    import Textbox from "../Textbox.svelte"

    import { isCloudStorageBar, setActive } from "$lib/scripts/chatViews";
</script>

<div class="viewBottomBar">
    {#if $isCloudStorageBar}
        <Button action={() =>{isCloudStorageBar.set(false)}}><Icon name="X"/></Button>
    {:else}
        <Button action={() =>{isCloudStorageBar.set(true)}}><Icon name="Plus"/></Button>
    {/if}
    <Textbox placeholder="Message General" icon="Chat" width="100%"/>
    <Button action={() =>{setActive("contacts")}}><Icon name="Users"/></Button>
    <Button action={() =>{setActive("maps")}}><Icon name="Location"/></Button>
    <Button action={() =>{setActive("polls")}}><Icon name="Equalizer"/></Button>
    <Button action={() =>{setActive("commands")}}><Icon name="Terminal"/></Button>
    <Button action={() =>{setActive("emoji")}}><Icon name="Smile"/></Button>
    <Button action={() =>{setActive("stickers")}}><Icon name="Sticker"/></Button>
    <Button action={() =>{setActive("gifs")}}><Icon name="Image"/></Button>
</div>

<style lang="scss">
    @use "$lib/style/colors.scss" as c;
    @use "$lib/style/variables.scss" as v;

    .viewBottomBar{
        display: flex;
        flex-direction: row;
        padding: v.$spacing-def;
        gap: v.$spacing-def;
        width: 100%;
        box-sizing: border-box;
    }
</style>