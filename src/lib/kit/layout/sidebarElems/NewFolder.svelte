<script lang="ts">
	import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";
	import Label from "$lib/kit/Label.svelte";
    import Textbox from "$lib/kit/Textbox.svelte";
    import { isNewFolder, newFolderE, windowClickEvent } from "$lib/scripts/chatViews";
    import { getUser, iconList } from "$lib/scripts/requests";
    import { isFirefox } from '$lib/scripts/isFirefox';
	import ChatEntry from '../../ChatEntry.svelte';
	import { user } from '$lib/scripts/globalData';
    import { isHttps, port, server, token } from "$lib/scripts/globalData";

	let isReallyFireFox = $state<boolean>(false);
	$effect(() => {
		isReallyFireFox = isFirefox();
	});

    let name: string | undefined = $state();
    let icon: string | undefined = $state("Cube");
    let ctxMenu: HTMLElement | undefined = $state();

    let isIconPicker: boolean = $state(false);
    let isChatPicker: boolean = $state(false);

    let chatPickerCtx: HTMLElement | undefined = $state();
    
    let icons = iconList();
    let chats = $state<{
        _id: string,
        type: string,
        id: {
            id: string,
            server: string
        }
    }[]>([]);
    
    const makeFolder = async () =>{
        try{
            const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/user/me/chatfolders/add?token=${$token}`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    icon: icon,
                    elements: chats
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            console.log(response)
            getUser($isHttps, $server, $port, ($token as string))
        }catch(e){
            console.log(e)
        }
        icon = "Cube"
        name = ""
        chats = []
        isNewFolder.set(false)
    }

    windowClickEvent.subscribe((e) => {
		if (
			e?.clientX < (ctxMenu?.offsetLeft as number) || 
			e?.clientX > (ctxMenu?.offsetLeft as number) + (ctxMenu?.offsetWidth as number) ||
			e?.clientY < (ctxMenu?.offsetTop as number) || 
			e?.clientY > (ctxMenu?.offsetTop as number) + (ctxMenu?.offsetHeight as number)
		) {
            if($isNewFolder){
                isIconPicker = false
                icon = "Cube"
                name = ""
                isNewFolder.set(false);
            }
		}
	});
</script>

<div
    bind:this={ctxMenu}
    class="window" style="
    scale: {$isNewFolder ? 1 : 0};
    pointer-events: {$isNewFolder ? "auto" : "none"};
    transform: translateY({$isNewFolder ? "0" : "300px"});
    top: {$isNewFolder ? 88 : -36 }px;
    left: {$isNewFolder ? $newFolderE?.clientX > 320 ? $newFolderE?.clientX - (ctxMenu?.clientWidth || 300) / 2 : 10 : $newFolderE?.clientX - 150}px;
    height: {isIconPicker ? 300 : isChatPicker ? chatPickerCtx?.clientHeight : 200}px;
">
    <div class="defaultView" style="
        left: {isIconPicker || isChatPicker ? "-320px" : "10px"}
    ">
        <Label icon="Plus" label="New folder"></Label>
        <Textbox onkeydown={(e: KeyboardEvent)=>{
            if(e.key == "Enter"){
                makeFolder()
            }
        }} maxlength={32} bind:value={name} width="100%" icon="Rename" placeholder="Name"></Textbox>
        <Button action={()=>{isIconPicker = true}} scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%">
            <div class="elem-horiz"><Icon name={icon}></Icon> Icon <div style="opacity: 0.5">{icon}</div> </div>
            <Icon name="Direction/Right"></Icon>
        </Button>
        <Button action={()=>{isChatPicker = true}} scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%">
            <div class="elem-horiz"><Icon name="Chat"></Icon> Add chats<div style="opacity: 0.5">{chats.length}</div> </div>
            <Icon name="Direction/Right"></Icon>
        </Button>
        <Button action={makeFolder} scaleClick={0.95} scaleHover={1.05} style={1} width="100%"><Icon name="Plus"></Icon>Add folder</Button>
    </div>
    <div class="iconPicker" style="
        left: {isIconPicker ? "0px" : "320px"}
    ">
        <div class="iconPickerTop">
            <Button action={()=>{isIconPicker = false}}><Icon name="Direction/Left"></Icon></Button>
            <Textbox bgc="black" width="100%" icon="Search" placeholder="Search icons..."></Textbox>
        </div>
        <grid class="iconList">
            {#each icons || [] as child}
				<Button width="36px; height: 36px;" style={(icon == child.substring(14, child.length - 4)) ? 6 : 4} action={()=>{
                    icon = child.substring(14, child.length - 4)
                    isIconPicker = false
                }}><Icon name={child.substring(14, child.length - 4)} /></Button>
			{/each}
        </grid>
    </div>
    <div bind:this={chatPickerCtx} class="chatPicker" style="
        left: {isChatPicker ? "0px" : "320px"}
    ">
        <div class="chatPickerTop">
            <Button action={()=>{isChatPicker = false}}><Icon name="Direction/Left"></Icon></Button>
            <Textbox bgc="black" width="100%" icon="Search" placeholder="Search chats..."></Textbox>
        </div>
        <div id="allChats" class="chatEntries" style="--pr: {isReallyFireFox ? 10 : 5}px">
            {#each $user?.chats || [] as child} 
                <ChatEntry click={()=>{
                    if(chats.find(e => e._id == child._id)){
                        chats = chats.filter(e => e._id != child._id)
                    }else{
                        chats = [...chats, child]
                    }
                    console.log(chats)
                }} isSelected={chats.find(e => e._id == child._id) ? true : false} data={child}></ChatEntry>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    
    @use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

    .chatPicker{
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        transition: 0.25s;
        position: absolute;
        top: 0;
    }

    .chatEntries{
        width: 300px;
        height: 400px;
        padding: v.$spacing-def;
        padding-top: 56px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: c.$bg;
    }

    .chatPickerTop {
        top: 0;
        left: 0;
        width: 302px;
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
        width: 302px;
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

    .defaultView{
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
    .window{
        transition: 0.25s;
        position: absolute;
        top: 88px;
        width: 280px;
        z-index: 2137;
        gap: v.$spacing-def;
        overflow: hidden;
    }
</style>