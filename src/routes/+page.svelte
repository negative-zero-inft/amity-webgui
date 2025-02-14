<script lang="ts">

    import "$lib/style/global.scss"; 
    import Button from "$lib/kit/Button.svelte";
    import ChatEntry from "$lib/kit/ChatEntry.svelte";
	import Icon from "$lib/kit/Icon.svelte";
    import Textbox from "$lib/kit/Textbox.svelte";

    let scrollContainer: HTMLDivElement | undefined;
    let startX: number | undefined; 

    function handleWheel(event: WheelEvent) {
        event.preventDefault();

        if (!scrollContainer) return; // Guard clause

        const delta = Math.sign(event.deltaY);
        const scrollSpeed = 150;

        scrollContainer.scrollLeft += delta * scrollSpeed;
    }

    function handleTouchStart(e: TouchEvent) {
        startX = e.touches.clientX;
    }

    function handleTouchMove(e: TouchEvent) {
        if (!startX ||!scrollContainer) return;

        const currentX = e.touches.clientX;
        const diffX = startX - currentX;

        scrollContainer.scrollLeft += diffX;
        startX = currentX;
    }
</script>

<div class="main">
    <div class="sidebar">
        <div class="sidebar-top">
            <div class="elements-horiz" style="
                width: 300px;
                justify-content: space-between; 
                padding-right: 10px; 
                padding-left: 10px;">
                <Button><Icon name="Hamburger" /></Button>
                <Button><Icon name="Camera/Video"/> Stories</Button>
                <Button><Icon name="Search"/></Button>
            </div>
            <div class="scroll-horiz" bind:this={scrollContainer} on:wheel={handleWheel}
            on:touchstart={handleTouchStart}
            on:touchmove={handleTouchMove}>
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
    <hr class="separator"/>
    <div class="view">
        <div class="viewTopBar">
            <div class="chatNameContainer">
                <div class="iconContainer">
                    <Icon name="Chat"/>
                </div>
                <div class="chatName">
                    <div>General</div>
                    <div class="subtext">Negative Zero</div>
                </div>
            </div>
            <div class="elements-horiz" style="gap: 10px">
                <Button><Icon name="Pin/Angled"/></Button>
                <Textbox placeholder="Search" icon="Search"></Textbox>
                <Button><Icon name="Hamburger"/></Button>
            </div>
        </div>
        <hr class="separator"/>
        <div class="chatView">я насрал в турбину самолета</div>
        <hr class="separator"/>
        <div class="viewBottomBar">
            <Button><Icon name="Plus"/></Button>
        </div>
    </div>
</div>

<style lang="scss">
    
    @use "$lib/style/colors.scss" as c;
    @use "$lib/style/variables.scss" as v;
    
    .viewBottomBar{
        display: flex;
        flex-direction: row;
        padding: v.$spacing-def;
        gap: v.$spacing-def;
    }
    .chatView{
        height: 100%;
        width: 100%;
        overflow: scroll;
        display: flex;
        flex-direction: column-reverse;
    }
    .subtext{
        color: c.$text-50;
    }
    .chatName{
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .chatNameContainer{
        display: flex;
        flex-direction: row;
        gap: v.$spacing-def;
    }
    .iconContainer{
        width: v.$elem-height;
        height: v.$elem-height;
        border: 1px;
        border-color: c.$text-25;
        border-style: solid;
        border-radius: v.$corner-elem;
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .viewTopBar{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        padding: v.$spacing-def;
    }
    .view{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .chatEntries{
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        padding: v.$spacing-def;
        overflow: scroll;
        flex-grow: 1;
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
</style>