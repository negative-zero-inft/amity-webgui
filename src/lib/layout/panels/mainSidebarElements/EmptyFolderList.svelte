<script lang="ts">
    import { _ } from "svelte-i18n";
    import Icon from "$lib/kit/decor/Icon.svelte";
    import Button from "$lib/kit/gizmos/Button.svelte";
    import { folderCtxMenuView } from "$lib/scripts/chatViews";

    let {
        isFolder = false
    } = $props();
</script>

<div class="emptySidebar">
    {#if isFolder}
        <Icon size={64}  name="Folder/Default"/>
    {:else}
        <img alt={$_("sidebar.sadBill")} src="/billSad.svg" />
    {/if}
    <div class="title" style="font-size: 18px;">{isFolder ? $_("sidebar.emptyFolder") : $_("sidebar.noChats")}</div>
    <div class="desc">{isFolder ? $_("sidebar.emptyFolderDesc") : $_("sidebar.noChatsDesc")}</div>
</div>

<style lang="scss">
    
    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .desc{
        width: 100%;
        text-align: center;
    }

    .emptySidebar{
        flex-direction: column;
        gap: v.$spacing-def;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>