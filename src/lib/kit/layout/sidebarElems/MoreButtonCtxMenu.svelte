<script lang="ts">
    import Button from '$lib/kit/Button.svelte';
	import Icon from '$lib/kit/Icon.svelte';
    import { isHttps, port, server, token, user } from "$lib/scripts/globalData";
	import { windowClickEvent, isMoreButtonCtxMenu, moreButtonClickEvent } from '$lib/scripts/chatViews';
	import Textbox from '$lib/kit/Textbox.svelte';
	import Label from '$lib/kit/Label.svelte';
	import Textarea from '$lib/kit/Textarea.svelte';
    import Switch from '$lib/kit/Switch.svelte';
    
    let{

    } = $props()

	let ctxMenu: HTMLElement | undefined = $state();
	let currentView: string = $state("default")
    let previousView: string = $state("default")
    let isGCPrivate: boolean = $state(false)
    let ctxDef: HTMLElement | undefined = $state();
    let ctxNew: HTMLElement | undefined = $state();
    let ctxNewGC: HTMLElement | undefined = $state();

    isMoreButtonCtxMenu.subscribe(()=>{
    })

    windowClickEvent.subscribe((e) => {
		if (
			e?.clientX < (ctxMenu?.offsetLeft as number) || 
			e?.clientX > (ctxMenu?.offsetLeft as number) + (ctxMenu?.offsetWidth as number) ||
			e?.clientY < (ctxMenu?.offsetTop as number) || 
			e?.clientY > (ctxMenu?.offsetTop as number) + (ctxMenu?.offsetHeight as number)
		) {
            if($isMoreButtonCtxMenu){
                currentView = "default";
                previousView = "default";
                $isMoreButtonCtxMenu = false;
            }
		}
	});
    
</script>

<div
    bind:this={ctxMenu}
    id="ctxMenu"
    class="window"
    style="
    position: absolute;
    left: calc({$moreButtonClickEvent?.clientX}px - {(ctxMenu?.clientWidth as number) / 2}px);
    scale: {$isMoreButtonCtxMenu ? 1 : 0};
    top: {$isMoreButtonCtxMenu ? 56 : -28}px;
    z-index: 12831928471983412381931723071;
    width: 240px;
    height: {
        currentView === "default" ? ctxDef?.clientHeight : 
        currentView === "new" ? ctxNew?.clientHeight : 
        ctxNewGC?.clientHeight}px;
    padding: 0;
"
>
    <div id="defaultCtxMenu" bind:this={ctxDef} class="defaultCtxMenuView" style="
        left: {currentView === "default" ? 0 : -240}px;
        opacity: {currentView === "default" ? 1 : previousView === "default" ? 1 : 0};
    ">
        <Button
            action={() => {
                currentView = "search"
            }}
            scaleClick={0.95}
            scaleHover={1.05}
            alignment="space-between"
            width="100%"
        >
            <div class="elem-horiz"><Icon name="Search"></Icon> Search Amity</div>
            <Icon name="Direction/Right"></Icon>
        </Button>
        <Button
            action={() => {
                currentView = "new"
                previousView = "default"
            }}
            scaleClick={0.95}
            scaleHover={1.05}
            alignment="space-between"
            width="100%"
        >
            <div class="elem-horiz"><Icon name="Plus"></Icon> Create...</div>
            <Icon name="Direction/Right"></Icon>
        </Button>
    </div>
    <div id="newCtxMenu" class="defaultCtxMenuView" bind:this={ctxNew} style="
        left: {currentView === "new" ? 0 : previousView === "new" ? -240 : 240}px;
        opacity: {currentView === "new" || previousView === "new" || previousView === "default" ? 1 : 0};
    ">
        <Button
            action={() => {
                currentView = "newGC"
                previousView = "new"
            }}
            scaleClick={0.95}
            scaleHover={1.05}
            width="100%"
            alignment="space-between"
        >
            <div class="elem-horiz"><Icon name="Users"></Icon> New group</div>
            <Icon name="Direction/Right"></Icon>
        </Button>
        <Button
            action={() => {
                currentView = "newSB"
                previousView = "new"
            }}
            scaleClick={0.95}
            scaleHover={1.05}
            width="100%"
            alignment="space-between"
        >
            <div class="elem-horiz"><Icon name="Announcement"></Icon> New soapbox</div>
            <Icon name="Direction/Right"></Icon>
        </Button>
        <Button
            action={() => {
                currentView = "default"
                previousView = "default"
            }}
            scaleClick={0.95}
            scaleHover={1.05}
            width="100%"
            alignment="left"
        ><Icon name="X"></Icon> Cancel</Button>
    </div>
    <div id="newGCCtxMenu" class="defaultCtxMenuView" bind:this={ctxNewGC} style="
        left: {currentView === "newGC" ? 0 : previousView === "newGC" ? -240 : 240}px;
        opacity: {currentView === "newGC" || previousView === "newGC" || previousView === "new" ? 1 : 0};
    ">
    <Textbox 
        maxlength={32}
        placeholder="Group name"
        width="100%"
        icon="Rename"
    ></Textbox>
    <Textarea 
        placeholder="Group description"
        width="100%"
        height="72px"
    ></Textarea>
    <Button 
        action={()=>{
            isGCPrivate = !isGCPrivate
        }}
        alignment="space-between"
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
    >
        <div class="elem-horiz">
            <Icon name={isGCPrivate ? "Lock/Locked" : "Lock/Unlocked"}></Icon>
            {isGCPrivate ? "Private" : "Public"}
        </div>
        <Switch isOn={isGCPrivate} />
    </Button>
    <Button
        action={() => {
            currentView = "new"
            previousView = "new"
        }}
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
        alignment="left"
    ><Icon name="X"></Icon> Cancel</Button>
    </div>
</div>

<style lang="scss">
    @use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

    .iconList{
        width: 305px;
        height: 320px;
        padding: v.$spacing-def;
        padding-top: 56px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 13px;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: c.$bg;
    }

    .iconPickerTop {
        top: 0;
        left: 0;
        width: 300px;
		box-sizing: border-box;
		flex-shrink: 0;
		background: linear-gradient(to bottom, #000000ff 50%, #00000000);
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		position: absolute;
        padding: v.$spacing-def;
        z-index: 21374;
	}

    .iconPicker{
        top: 0;
        width: 280px;
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        position: absolute;
        transition: 0.25s;
    }


    .elem-horiz {
		display: flex;
		gap: v.$spacing-def;
		align-items: center;
	}
    .menuTop{
        display: flex;
        gap: v.$spacing-def;
    }
    .editCtxMenuView{
		width: 220px;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		position: absolute;
		transition: 0.25s;
        padding: v.$spacing-def;
	}
	.defaultCtxMenuView{
		width: 220px;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		position: absolute;
		transition: left 0.25s;
        padding: v.$spacing-def;
	}
</style>