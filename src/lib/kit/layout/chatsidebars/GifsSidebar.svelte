<script lang="ts">
	import Button from "$lib/kit/Button.svelte";
	import Sticker from "$lib/kit/Sticker.svelte";
	import Icon from "$lib/kit/Icon.svelte";
	import Label from "$lib/kit/Label.svelte";
	import Textbox from "$lib/kit/Textbox.svelte";

    import { isGifBar } from "$lib/scripts/chatViews";
    let animatedSidebar: number = 0;

    $: {
        if($isGifBar){
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

{#if $isGifBar}
    <hr class="separator"/>
{/if}
<div class="bar" style="--w: {animatedSidebar}px">
    {#if $isGifBar}        
        <div class="topBar">
            <Textbox width="100%; background-color: black;" icon="Search" placeholder="Search gifs..."></Textbox>
            <Button><Icon name="Plus"></Icon></Button>
        </div>
    {/if}
    <!-- <hr class="separator"/> -->
    <div class="emojiList">
        <Label icon="Star" label="Favorites"></Label>
        <grid class="emojiGrid">
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <div class="moreButton"><Button><Icon name="More"></Icon>More</Button></div>
        </grid>
        <Label icon="Clock" label="Recent"></Label>
        <grid class="emojiGrid">
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <img alt="gif" src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif" class="centered"/>
            <div class="moreButton"><Button><Icon name="More"></Icon>More</Button></div>
        </grid>
    </div>
</div>

<style lang="scss">

    @use "$lib/style/variables.scss" as v;
    @use "$lib/style/colors.scss" as c;

    .moreButton{
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .centered{
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.25s;
        border-radius: v.$corner-elem;
    }
    .centered:hover{
        transform: scale(1.1);
    }
    .centered:active{
        transform: scale(0.9);
        transition: 0.1s;
    }

    .emojiGrid{
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 7 equal-width columns */
        grid-template-rows: repeat(3, 1fr);    /* 3 equal-height rows */
        gap: 5px; /* Initial gap, will be overridden */
        width: 100%; /* Or a specific width */
        height: max-content; /* Or a specific height */
    }
    .emojiList{
        width: 320px;
        height: calc(100vh - 6px - 56px);
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
        right: 0;
    }

    .bar{
        transition: 0.25s ease 0s;
        width: var(--w);
        height: 100%;
        overflow: hidden;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
    }
</style>