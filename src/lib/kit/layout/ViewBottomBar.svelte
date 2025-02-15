<script lang="ts">
	import Button from "../Button.svelte";
	import Icon from "../Icon.svelte";
    import Textbox from "../Textbox.svelte"

    import { isEmojiBar, isCloudStorageBar, isCommandBar, isContactsBar, isGifBar, isMapBar, isPollBar, isStickerBar } from "$lib/scripts/chatViews";

    const states = [
        {id: "emoji", active: isEmojiBar},
        {id: "contacts", active: isContactsBar},
        {id: "gifs", active: isGifBar},
        {id: "maps", active: isMapBar},
        {id: "polls", active: isPollBar},
        {id: "stickers", active: isStickerBar},
        {id: "commands", active: isCommandBar}
    ]

    function setActive(id: string) {
        states.forEach(item => {
            if (item.id === id) {
                item.active.update(v => !v);
                console.log(`set ${item.id} active`)
            } else {
                item.active.set(false);
            }
        });
    }
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