<script lang="ts">
	import Button from "$lib/kit/gizmos/Button.svelte";
    import Icon from "$lib/kit/decor/Icon.svelte";
    import { folderCtxMenuView, prevFolderCtxMenuView, ctxFolder, type folderType } from "$lib/scripts/chatViews";
    import Label from "$lib/kit/decor/Label.svelte";
    import { _ } from "svelte-i18n";
    import { getUser } from "$lib/scripts/requests";
    import { isHttps, server, port, token } from "$lib/scripts/globalData";
    let {
        height = $bindable(0),
        width = $bindable(0)
    }: {
        height: number,
        width: number
    } = $props();

    let ctxMenu: HTMLElement | null = $state(null);

    const left = ()=>{
        if($folderCtxMenuView === "default" || $folderCtxMenuView === "hidden"){
            return 10;
        }else if($prevFolderCtxMenuView === "default"){
            return -320;
        }else{
            return -320;
        }
    }

    const folderDelProc = async ()=>{
        try {
            const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/user/me/chatfolders?token=${$token}`, {
                method: "DELETE",
                body: JSON.stringify({
                    _id: $ctxFolder._id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            });
            console.log(response);
            getUser($isHttps, $server, $port, ($token as string));
        } catch (e) {
            console.log(e);
        }
    }
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
    <div 
        class="elem-horiz"
        style="
            width: 100%;
            justify-content: space-between;
            padding-right: 5px;
            box-sizing: border-box;
        "
    >
        <Label icon="Folder/Default" label={$ctxFolder.name.length > 0 ? $ctxFolder.name : $ctxFolder.icon}/>
        <Icon name={$ctxFolder.icon}/>
    </div>
    <Button
        action={()=>{
            folderCtxMenuView.set("edit")
            prevFolderCtxMenuView.set("default")
        }}
        alignment="space-between"
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
    >
        <div class="elem-horiz">
            <Icon name="Pencil/Angled"/>
            {$_("sidebar.folderCtx.editButton")}
        </div>
        <Icon name="Direction/Right"/>
    </Button>
    <Button
        action={()=>{
            folderDelProc()
            folderCtxMenuView.set("hidden")
            prevFolderCtxMenuView.set("default")
        }}
        alignment="space-between"
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
        style="destructive"
    >
        <div class="elem-horiz">
            <Icon name="Trash"/>
            {$_("sidebar.folderCtx.deleteButton")}
        </div>
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