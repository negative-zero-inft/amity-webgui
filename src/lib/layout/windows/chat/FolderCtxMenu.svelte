<script lang="ts">
    import { folderCtxMenuView, windowClickEvent, folderClickEvent, prevFolderCtxMenuView } from "$lib/scripts/chatViews";
	import DefaultView from "./folderCtxMenuElems/DefaultView.svelte";
    import EditView from "./folderCtxMenuElems/EditView.svelte";
    import { icon, elements } from "$lib/scripts/folderCtx";
    import { ctxFolder } from "$lib/scripts/chatViews";
	import IconPicker from "../universal/IconPicker.svelte";
    import ChatPicker from "../universal/ChatPicker.svelte";
    let ctxMenu: HTMLElement | null = $state(null);

    windowClickEvent.subscribe((e: MouseEvent)=>{
        if (
            (
                e?.clientX < (ctxMenu?.offsetLeft as number) || 
                e?.clientX > (ctxMenu?.offsetLeft as number) + (ctxMenu?.offsetWidth as number) ||
                e?.clientY < (ctxMenu?.offsetTop as number) || 
                e?.clientY > (ctxMenu?.offsetTop as number) + (ctxMenu?.offsetHeight as number)
            ) && $folderCtxMenuView != "hidden"
        ) {
            folderCtxMenuView.set("hidden")
            prevFolderCtxMenuView.set("hidden")
        }
    })

    $effect(()=>{
        icon.set($ctxFolder?.icon)
        elements.set($ctxFolder?.elements)
    })

    const numbers = (value: "width" | "height")=>{
        switch($folderCtxMenuView){
            case "default":
                return value === "width" ? defWidth : defHeight;
            case "edit":
                return value === "width" ? editWidth : editHeight;
            case "iconPicker":
                return value === "width" ? iconWidth : iconHeight;
            case "chatPicker":
                return value === "width" ? chatWidth : chatHeight;
            default:
                return value === "width" ? defWidth : defHeight;
        }
    }

    let leftV = $state();
    $effect(()=>{
        if($folderClickEvent?.clientX - 10 > numbers("width") / 2){
            leftV = $folderClickEvent?.clientX - numbers("width") / 2;
        }else{
            leftV = 10;
        }
    })

    let defWidth = $state(0);
    let defHeight = $state(0);
    let editWidth = $state(0);
    let editHeight = $state(0);
    let iconWidth = $state(0);
    let iconHeight = $state(0);
    let chatWidth = $state(0);
    let chatHeight = $state(0);
</script>

<div 
    bind:this={ctxMenu}
    id="folderCtxMenu"
    class="window"
    style="
        scale: {$folderCtxMenuView === "hidden" ? 0 : 1};
        width: {numbers("width")}px;
        height: {numbers("height")}px;
        left: {leftV}px;
        top: {$folderCtxMenuView === "hidden" ? 16 : 36 + 25 + 32}px;
        pointer-events: {$folderCtxMenuView === "hidden" ? "none" : "auto"};
    "
>
    <DefaultView bind:width={defWidth} bind:height={defHeight}/>
    <EditView bind:width={editWidth} bind:height={editHeight}/>
    <IconPicker viewWidth={numbers("width")} bind:width={iconWidth} bind:height={iconHeight} view={folderCtxMenuView} prevView={prevFolderCtxMenuView} icon={icon}/>
    <ChatPicker viewWidth={numbers("width")} bind:width={chatWidth} bind:height={chatHeight} view={folderCtxMenuView} prevView={prevFolderCtxMenuView} elements={elements}/>
</div>

<style lang="scss">
    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    #folderCtxMenu{
        position: absolute;
        top: 0;
        left: 0;
    }
</style>