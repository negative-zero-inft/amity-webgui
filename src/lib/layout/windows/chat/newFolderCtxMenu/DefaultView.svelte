<script lang="ts">
	import Button from "$lib/kit/gizmos/Button.svelte";
    import Icon from "$lib/kit/decor/Icon.svelte";
    import { view, prevView, icon, chats } from "$lib/scripts/newFolderWritables";
    import Label from "$lib/kit/decor/Label.svelte";
    import { _ } from "svelte-i18n";
    import { getUser } from "$lib/scripts/requests";
    import { isHttps, server, port, token } from "$lib/scripts/globalData";
	import Textbox from "lib/kit/text/Textbox.svelte";

    let {
        height = $bindable(0),
        width = $bindable(0)
    }: {
        height: number,
        width: number
    } = $props();

    let ctxMenu: HTMLElement | null = $state(null);

    const left = ()=>{
        if($view === "default" || $view === "hidden"){
            return 10;
        }else{
            return -320;
        }
    }

    let name = $state("")

    const makeFolder = async () =>{
        try {
			const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/folders/new?token=${$token}`, {
				method: "POST",
				body: JSON.stringify({ name, icon: $icon, elements: $chats }),
				headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
			});
			getUser($isHttps, $server, $port, ($token as string));
		} catch (e) {
			throw e;
		}
        view.set("hidden")
    }

    view.subscribe((v)=>{
        if(v != "hidden") return
        name = ""
        icon.set("Cube")
        chats.set([])
        prevView.set("hidden")
    })
</script>

<div 
    id="folderCtxMenuDefaultView"
    class="defaultView"
    bind:clientHeight={height}
    bind:clientWidth={width}
    bind:this={ctxMenu}
    style="
        left: {left()}px;
    "
>
    <Label icon="Plus" label="New folder"></Label>
    <Textbox
        onkeydown={(e: KeyboardEvent) => { if (e.key == "Enter") makeFolder(); }}
        maxlength={32}
        bind:value={name}
        width="100%"
        icon="Rename"
        placeholder="Name"
    ></Textbox>
    <Button action={() => { view.set("iconPicker"); prevView.set("default") }} scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%">
        <div class="elem-horiz"><Icon name={$icon}></Icon> Icon <div style="opacity: 0.5">{$icon}</div></div>
        <Icon name="Direction/Right"/>
    </Button>
    <Button action={() => { view.set("chatPicker"); prevView.set("default") }} scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%">
        <div class="elem-horiz"><Icon name="Chat"></Icon> Add chats<div style="opacity: 0.5">{$chats.length}</div></div>
        <Icon name="Direction/Right"/>
    </Button>
    <Button action={makeFolder} scaleClick={0.95} scaleHover={1.05} style="accent" width="100%">
        <Icon name="Plus"/>Add folder
    </Button>
</div>

<style lang="scss">
    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    #folderCtxMenuDefaultView{
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        width: 240px;
        transition: 0.25s;
    }
</style>