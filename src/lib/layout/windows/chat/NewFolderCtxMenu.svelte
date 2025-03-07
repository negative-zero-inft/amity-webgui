<script lang="ts">
    import { view, prevView, icon, chats, newFolderE } from "$lib/scripts/newFolderWritables";
    import { windowClickEvent } from "$lib/scripts/chatViews"
	import DefaultView from "./newFolderCtxMenu/DefaultView.svelte";
	import IconPicker from "../universal/IconPicker.svelte";
    import ChatPicker from "../universal/ChatPicker.svelte";
    let ctxMenu: HTMLElement | null = $state(null);

    let isSafe: boolean = false;

    windowClickEvent.subscribe((e: MouseEvent)=>{
        if (
            (
                e?.clientX < (ctxMenu?.offsetLeft as number) || 
                e?.clientX > (ctxMenu?.offsetLeft as number) + (ctxMenu?.offsetWidth as number) ||
                e?.clientY < (ctxMenu?.offsetTop as number) || 
                e?.clientY > (ctxMenu?.offsetTop as number) + (ctxMenu?.offsetHeight as number)
            ) && $view != "hidden"
        ) {
            view.set("hidden")
            prevView.set("hidden")
        }
    })

    const numbers = (value: "width" | "height")=>{
        switch($view){
            case "default":
                return value === "width" ? defWidth : defHeight;
            case "chatPicker":
                return value === "width" ? chatWidth : chatHeight
            case "iconPicker":
                return value === "width" ? iconWidth : iconHeight
            default:
                return value === "width" ? defWidth : defHeight;
        }
    }

    let leftV = $state();
    $effect(()=>{
        if($newFolderE?.clientX - 10 > numbers("width") / 2){
            leftV = $newFolderE?.clientX - numbers("width") / 2;
        }else{
            leftV = 10;
        }
    })

    let defWidth = $state(0);
    let defHeight = $state(0);
    let iconWidth = $state(0);
    let iconHeight = $state(0);
    let chatWidth = $state(0);
    let chatHeight = $state(0);
</script>

<div 
    bind:this={ctxMenu}
    id="newFolderCtxMenu"
    class="window"
    style="
        scale: {$view === "hidden" ? 0 : 1};
        width: {numbers("width")}px;
        height: {numbers("height")}px;
        left: {leftV}px;
        top: {$view === "hidden" ? (36 + 10 + 16) - numbers("height") / 2 : 36 + 25 + 32}px;
        pointer-events: {$view === "hidden" ? "none" : "auto"};
    "
>
    <DefaultView bind:width={defWidth} bind:height={defHeight}/>
    <IconPicker viewWidth={numbers("width")} bind:width={iconWidth} bind:height={iconHeight} view={view} prevView={prevView} icon={icon}/>
    <ChatPicker viewWidth={numbers("width")} bind:width={chatWidth} bind:height={chatHeight} view={view} prevView={prevView} elements={chats}/>
</div>

<style lang="scss">
    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    #newFolderCtxMenu{
        position: absolute;
        top: 0;
        left: 0;
    }
</style>