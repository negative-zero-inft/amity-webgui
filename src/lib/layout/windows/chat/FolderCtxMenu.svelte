<script lang="ts">
    import { folderCtxMenuView, windowClickEvent, folderClickEvent } from "$lib/scripts/chatViews";
	import DefaultView from "./folderCtxMenuElems/DefaultView.svelte";
    let ctxMenu: HTMLElement | null = $state(null);

    windowClickEvent.subscribe((e: MouseEvent)=>{
        if (
            (
                e?.clientX < (ctxMenu?.offsetLeft as number) || 
                e?.clientX > (ctxMenu?.offsetLeft as number) + (ctxMenu?.offsetWidth as number) ||
                e?.clientY < (ctxMenu?.offsetTop as number) || 
                e?.clientY > (ctxMenu?.offsetTop as number) + (ctxMenu?.offsetHeight as number)
            ) && (e.target as HTMLElement)?.id != "folderButton"
        ) {
            folderCtxMenuView.set("hidden")
        }
    })

    const numbers = (value: "width" | "height")=>{
        switch($folderCtxMenuView){
            case "default":
                return value === "width" ? defWidth : defHeight;
            case "edit":
                return value === "width" ? defWidth : defHeight;
            case "icon":
                return value === "width" ? defWidth : defHeight;
            default:
                return value === "width" ? defWidth : defHeight;
        }
    }

    const left = ()=>{
        if($folderClickEvent?.clientX - 10 > (ctxMenu as HTMLElement)?.offsetWidth / 2){
            return $folderClickEvent?.clientX - (ctxMenu as HTMLElement)?.offsetWidth / 2;
        }else{
            return 10;
        }
    }

    let defWidth = $state(0);
    let defHeight = $state(0);
</script>

<div 
    bind:this={ctxMenu}
    id="folderCtxMenu"
    class="window"
    style="
        scale: {$folderCtxMenuView === "hidden" ? 0 : 1};
        width: {numbers("width")}px;
        height: {numbers("height")}px;
        left: {left()}px;
        top: {$folderCtxMenuView === "hidden" ? 16 : 36 + 25 + 32}px;
        pointer-events: {$folderCtxMenuView === "hidden" ? "none" : "auto"};
    "
>
    <DefaultView bind:width={defWidth} bind:height={defHeight}/>
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