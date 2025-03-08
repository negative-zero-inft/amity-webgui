<script lang="ts">
	import Button from "$lib/kit/gizmos/Button.svelte";
    import Icon from "$lib/kit/decor/Icon.svelte";
    import { folderCtxMenuView, prevFolderCtxMenuView, ctxFolder, type folderType } from "$lib/scripts/chatViews";
    import Label from "$lib/kit/decor/Label.svelte";
    import { _ } from "svelte-i18n";
    import { getUser } from "$lib/scripts/requests";
    import { isHttps, server, port, token } from "$lib/scripts/globalData";
    import Textbox from "$lib/kit/text/Textbox.svelte";
    import { icon, elements } from "$lib/scripts/folderCtx";

    let {
        height = $bindable(0),
        width = $bindable(0)
    }: {
        height: number,
        width: number
    } = $props();

    let ctxMenu: HTMLElement | null = $state(null);

    let name = $state("")
    $effect(()=>{
        name = $ctxFolder?.name
    })

    const left = ()=>{
        if($folderCtxMenuView == "edit"){
            return 10;
        }else if($prevFolderCtxMenuView == "edit"){
            return -320;
        }else{
            return 320;
        }
    }
    const opacity = ()=>{
        if($folderCtxMenuView == "edit"){
            return 1;
        }else if($prevFolderCtxMenuView == "edit"){
            return 1;
        }else{
            return 0;
        }
    }

    const folderEditProc = async ()=>{
        console.log(name)
        try {
            const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/folders?token=${$token}`, {
                method: "PUT",
                body: JSON.stringify({
                    name: name,
                    icon: $icon,
                    _id: $ctxFolder?._id,
                    elements: $elements
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            console.log(response);
            getUser($isHttps, $server, $port, ($token as string));
        }catch(e){
            console.error(e);
        }
        folderCtxMenuView.set("hidden")
        prevFolderCtxMenuView.set("default")
    }

</script>

<div 
    id="folderCtxMenuEditView"
    class="defaultView"
    bind:clientHeight={height}
    bind:clientWidth={width}
    bind:this={ctxMenu}
    style="
        left: {left()}px;
        opacity: {opacity()};
    "
>
    <div class="elem-horiz">
        <Button action={()=>{
            folderCtxMenuView.set("default")
            prevFolderCtxMenuView.set("default")
            name = $ctxFolder.name
            icon.set($ctxFolder.icon)
        }}>
            <Icon name="Direction/Left"/>
        </Button>
        <Textbox 
            bind:value={name} 
            width="100%"
            icon="Rename"
            onkeydown={(e: KeyboardEvent)=>{
                if(e.key == "Enter"){
                    folderEditProc()
                }
            }}
        />
    </div>
    <Button
        action={()=>{
            folderCtxMenuView.set("iconPicker")
            prevFolderCtxMenuView.set("edit")
        }}
        alignment="space-between"
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
    >
        <div class="elem-horiz">
            <Icon name={$icon}/>
            {$_("sidebar.folderCtx.iconButton")}
            <div style="opacity: 0.5;">{$icon}</div>
        </div>
        <Icon name="Direction/Right"/>
    </Button>
    <Button
        action={()=>{
            folderCtxMenuView.set("chatPicker")
            prevFolderCtxMenuView.set("edit")
        }}
        alignment="space-between"
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
    >
        <div class="elem-horiz">
            <Icon name="Chat"/>
            {$_("sidebar.folderCtx.chatPickerButton")}
            <div style="opacity: 0.5;">{$elements.length}</div>
        </div>
        <Icon name="Direction/Right"/>
    </Button>
    <Button
        action={()=>{
            folderEditProc()
            folderCtxMenuView.set("hidden")
            prevFolderCtxMenuView.set("default")
        }}
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
        style="accent"
    >
        <Icon name="Save"/>
        {$_("sidebar.folderCtx.editSaveButton")}
    </Button>
</div>

<style lang="scss">
    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    #folderCtxMenuEditView{
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        width: 240px;
        transition: 0.25s;
    }
</style>