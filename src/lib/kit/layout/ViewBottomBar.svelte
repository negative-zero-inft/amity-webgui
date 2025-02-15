<script>
	import Button from "../Button.svelte";
	import Icon from "../Icon.svelte";
    import Textbox from "../Textbox.svelte"

    import { isEmojiBar } from "$lib/scripts/chatViews";

    const changeEmojiBarState = () =>{
        isEmojiBar.update(v => !v)
        console.log(isEmojiBar)
    }
</script>

<div class="viewBottomBar">
    <Button><Icon name="Plus"/></Button>
    <Textbox placeholder="Message General" icon="Chat" width="100%"/>
    <Button action={changeEmojiBarState}><Icon name="Smile"/></Button>
    <Button><Icon name="Sticker"/></Button>
    <Button><Icon name="Image"/></Button>
    <Button><Icon name="Microphone"/></Button>
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