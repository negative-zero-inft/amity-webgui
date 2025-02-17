<script lang="ts">
	import Button from "$lib/kit/Button.svelte";
	import Emoji from "$lib/kit/Emoji.svelte";
	import Icon from "$lib/kit/Icon.svelte";
	import Label from "$lib/kit/Label.svelte";
	import Textbox from "$lib/kit/Textbox.svelte";


    import { isEmojiBar } from "$lib/scripts/chatViews";
    let animatedSidebar: number = 0;

    $: {
        if($isEmojiBar){
            animatedSidebar = 320;
        }else{
            animatedSidebar = 0;
        }
    }

    let scrollContainer: HTMLDivElement | undefined;
    let startX: number | undefined; 

    function handleWheel(event: WheelEvent) {
        event.preventDefault();

        if (!scrollContainer) return; // Guard clause

        const delta = Math.sign(event.deltaY);
        const scrollSpeed = 150;

        scrollContainer.scrollLeft += delta * scrollSpeed;
    }

    function handleTouchStart(_e: TouchEvent) {
        // e.touches.clientX doesn't exist
        // therefore it's actually returns 0
        // still somehow works?
        startX = 0;
    }

    function handleTouchMove(_e: TouchEvent) {
        if (!startX ||!scrollContainer) return;

        const currentX = 0;
        const diffX = startX - currentX;

        console.log(currentX)

        scrollContainer.scrollLeft += diffX;
        startX = currentX;
    }
</script>

{#if $isEmojiBar}
    <hr class="separator"/>
{/if}
<div class="bar" style="--w: {animatedSidebar}px">
    {#if $isEmojiBar}        
        <div class="topBar">
            <Textbox width="100%; background-color: black;" icon="Search" placeholder="Search emoji..."></Textbox>
            <Button><Icon name="Plus"></Icon></Button>
        </div>
    {/if}
    <!-- <hr class="separator"/> -->
    <div class="emojiList">
        <Label icon="Star" label="Favorites"></Label>
        <grid class="emojiGrid">
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <Button><Icon name="More"></Icon></Button>
        </grid>
        <Label icon="Clock" label="Recent"></Label>
        <grid class="emojiGrid">
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <div class="centered"><Emoji></Emoji></div>
            <Button><Icon name="More"></Icon></Button>
        </grid>
    </div>
    <hr class="separator"/>
    <div class="bottomBar" bind:this={scrollContainer} onwheel={handleWheel}>
        {#if $isEmojiBar}
            <div class="defaultEmoji">    
                <Button ><Icon name="Smile"></Icon></Button>
            </div>
        {/if}
        <Button style={2}><Icon name="Star"></Icon></Button>
        <Button ><Icon name="Clock"></Icon></Button>
        <hr class="smallSeparator" style="height: 10px;">
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
        <Button width="36px"><Emoji></Emoji></Button>
    </div>
</div>

<style lang="scss">

    @use "$lib/style/variables.scss" as v;
    @use "$lib/style/colors.scss" as c;

    .centered{
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.25s;
    }
    .centered:hover{
        transform: scale(1.5);
    }
    .centered:active{
        transform: scale(0.75);
        transition: 0.1s;
    }

    .emojiGrid{
        display: grid;
        grid-template-columns: repeat(7, 1fr); /* 7 equal-width columns */
        grid-template-rows: repeat(3, 1fr);    /* 3 equal-height rows */
        gap: 8px; /* Initial gap, will be overridden */
        width: 100%; /* Or a specific width */
        height: max-content; /* Or a specific height */
    }
    
    .defaultEmoji{
        position: absolute;
        right: 0;
        height: 56px;
        width: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to left, #000000ff 50%, #00000000);
    }
    .smallSeparator{
        color: c.$text-25;
        margin: 0;
    }
    .emojiList{
        width: 320px;
        height: calc(100vh - 6px - 56px * 2);
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        overflow: auto;
        scroll-behavior: smooth;
        padding: v.$spacing-def;
        box-sizing: border-box;
        padding-top: 56px;
        gap: v.$spacing-def;
    }
    .bottomBar{
        width: 320px;
        padding: v.$spacing-def;
        flex-shrink: 0;
        height: 56px;
        box-sizing: border-box;
        background-color: c.$bg;
        display: flex;
        flex-direction: row;
        gap: v.$spacing-def;
        align-items: center;
        overflow: scroll;
        scroll-behavior: smooth;
        padding-right: 60px;
    }
    .topBar{
        width: 320px;
        height: 56px;
        box-sizing: border-box;
        padding: v.$spacing-def;
        flex-shrink: 0;
        background: linear-gradient(to bottom, #000000ff 50%, #00000000);
        display: flex;
        flex-direction: row;
        gap: v.$spacing-def;
        position: absolute;
    }

    .bar{
        transition: 0.25s ease 0s;
        width: var(--w);
        height: 100%;
        overflow: hidden;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        right: 0;
    }
</style>