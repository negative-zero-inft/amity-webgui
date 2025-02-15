<script lang="ts">
	import Button from "../Button.svelte";
	import ChatEntry from "../ChatEntry.svelte";
	import Icon from "../Icon.svelte";

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

<div class="sidebar">
    <div class="sidebar-top">
        <div class="elements-horiz" style="
            width: 300px;
            justify-content: space-between; 
            padding-right: 10px; 
            padding-left: 10px;">
            <Button><Icon name="Hamburger" /></Button>
            <Button><Icon name="Camera/Video"/>Stories</Button>
            <Button><Icon name="Search"/></Button>
        </div>
        <div class="scroll-horiz" bind:this={scrollContainer} onwheel={handleWheel}
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
            <Button style={2}><Icon name="Star"/>balls 69</Button>
        </div>
    </div>
    <hr class="separator"/>
    <div class="chatEntries">
        <ChatEntry isFavorite={true}></ChatEntry>
        <ChatEntry username={"Harry Bōlz"}></ChatEntry>
        <ChatEntry unreads={69}></ChatEntry>
        <ChatEntry timestamp={Date.now()}></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
        <ChatEntry></ChatEntry>
    </div>
</div>

<style lang="scss">

    @use "$lib/style/colors.scss" as c;
    @use "$lib/style/variables.scss" as v;
    
    .storiespfps{
        display: grid;
        align-items: center;
    }
    .storiespfp{
        grid-area: 1/1;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        outline: 2px;
        outline-color: c.$clickable;
    }
    .scroll-horiz{
        display: flex;
        flex-direction: row;
        gap: v.$spacing-def;
        overflow: scroll;
        scrollbar-width: none;  /* Firefox */
        padding-right: v.$spacing-def;
        padding-left: v.$spacing-def;
        height: v.$chip-height;
        scroll-behavior: smooth;
    }
    .scroll-horiz::-webkit-scrollbar{
        width: none;
    }
    .elements-horiz{
        display: flex;
        flex-direction: row;
    }
    .sidebar-top{
        
        flex-direction: column;
        display: flex;
        padding: v.$spacing-def;
        padding-right: 0px;
        padding-left: 0px;
        gap: v.$spacing-def;
    }
    .sidebar{
        height: 100%;
        width: 320px;
        display: flex;
        flex-direction: column;
    }

    .chatEntries{
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        padding: v.$spacing-def;
        overflow: scroll;
        flex-grow: 1;
    }
</style>