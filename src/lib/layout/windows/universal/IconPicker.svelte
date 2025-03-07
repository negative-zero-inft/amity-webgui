<script lang="ts">
	import Button from "$lib/kit/gizmos/Button.svelte";
    import Icon from "$lib/kit/decor/Icon.svelte";
    import { folderCtxMenuView, prevFolderCtxMenuView, ctxFolder, type folderType } from "$lib/scripts/chatViews";
    import Label from "$lib/kit/decor/Label.svelte";
    import { _ } from "svelte-i18n";
    import { writable } from "svelte/store";
    import { isHttps, server, port, token } from "$lib/scripts/globalData";
    import Textbox from "$lib/kit/text/Textbox.svelte";
    import { iconList } from "$lib/scripts/requests";

    let {
        height = $bindable(0),
        width = $bindable(0),
        view = $bindable(),
        prevView = $bindable(),
        icon = $bindable(),
        viewWidth = $bindable()
    }: {
        height: number,
        width: number,
        view: any,
        prevView: any,
        icon: any,
        viewWidth: number
    } = $props();

    let ctxMenu: HTMLElement | null = $state(null);

    const left = ()=>{
        if($view === "iconPicker"){
            return 10;
        }else if($prevView === "iconPicker"){
            return 0 - viewWidth;
        }else{
            return viewWidth;
        }
    }

    const opacity = ()=>{
        if($view == "iconPicker"){
            return 1;
        }else if($prevView == "iconPicker"){
            return 1;
        }else{
            return 0;
        }
    }

    let iconSearchQuery = $state("");
    let icons = iconList();
    
    view.subscribe((e: string)=>{
        if(e != "iconPicker"){
            iconSearchQuery = ""
        }
    })

    const filteredIcons = () => {
		if (!iconSearchQuery) return icons;
		return icons.filter(icon => icon.toLowerCase().includes(iconSearchQuery.toLowerCase()));
	};
</script>

<div 
    id="iconPickerView"
    class="defaultView"
    bind:clientHeight={height}
    bind:clientWidth={width}
    bind:this={ctxMenu}
    style="
        left: {left()}px;
        opacity: {opacity()};
    "
>
    <div class="iconPickerTop">
        <Button action={() => { view.set($prevView) }}><Icon name="Direction/Left"></Icon></Button>
        <Textbox
            bgc="black"
            width="100%"
            icon="Search"
            placeholder={$_("ctxMenus.searchIcons")}
            bind:value={iconSearchQuery}
        ></Textbox>
    </div>
    <grid class="iconList">
        {#each filteredIcons() as child}
            <Button 
                width="36px; height: 36px;" 
                style={($icon == child.substring(14, child.length - 4)) ? "selected" : "default"} 
                action={() => {
                    icon.set(child.substring(14, child.length - 4));
                    view.set($prevView)
                }}
            >
                <Icon name={child.substring(14, child.length - 4)} />
            </Button>
        {/each}
    </grid>
</div>

<style lang="scss">
    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    #iconPickerView{
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        width: 266px;
        transition: 0.25s;
        height: 300px;
        overflow: visible;
    }

    .iconList {
        width: 286px;
        position: relative;
        left: -10px;
		height: 310px;
        flex-shrink: 0;
        padding: v.$spacing-def;
		padding-top: 46px;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(6, 36px);
		grid-template-rows: repeat(6, 36px);
		gap: 10px;
		overflow-y: scroll;
		overflow-x: hidden;
		background-color: c.$bg;
    }

    .iconPickerTop {
        top: -10px;
        left: -10px;
        width: inherit;
        flex-shrink: 0;
        background: linear-gradient(to bottom, #000000ff 50%, #00000000);
        display: flex;
        flex-direction: row;
        gap: v.$spacing-def;
        position: absolute;
        z-index: 21374;
        padding: v.$spacing-def;
    }

</style>