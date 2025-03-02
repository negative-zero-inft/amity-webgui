<script lang="ts">
    import { isFirefox } from "$lib/scripts/isFirefox";
    import { user } from "$lib/scripts/globalData";
    import { currentFolder, previousFolder } from "$lib/scripts/chatViews";
    import ChatEntry from "$lib/kit/gizmos/ChatEntry.svelte";
	import EmptyFolderList from "./EmptyFolderList.svelte";

</script>

<div 
    class="chatEntriesContainer"
>
    <div id="allChats" class="chatEntries" style="
        padding-right: {isFirefox() ? 10 : 5}px;
        left: {$currentFolder._id == "AC" ? 0 : -320}px;
    ">
        {#if $user?.chats.length > 0}
            {#each $user?.chats || [] as child} 
                <ChatEntry isSidebar={true} data={child}></ChatEntry>
            {/each}
        {:else}
            <EmptyFolderList/>
        {/if}
    </div>
    {#each $user?.chat_folders || [] as child}
        <div id="allChats" class="chatEntries" style="
            padding-right: {isFirefox() ? 10 : 5}px;
            left: {
                $currentFolder._id == child._id ? 0 : 
                $currentFolder.index > $user?.chat_folders.findIndex((e: any) => e._id == child._id) + 1 ? -320 : 
                $currentFolder.index < $user?.chat_folders.findIndex((e: any) => e._id == child._id) + 1 ? 320 : 
                0
            }px;
            opacity: {
                $currentFolder._id == child._id ? 1 : 
                $previousFolder._id == child._id ? 1 : 
                0
            }
        ">
            {#each child.elements || [] as chatentry} 
                <ChatEntry isSidebar={true} data={chatentry}></ChatEntry>
            {/each}
        </div>
    {/each}
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .chatEntries{
        width: 100%;
        height: calc(100vh - 99px);
        display: flex;
        flex-direction: column;
        padding: v.$spacing-def;
        box-sizing: border-box;
        position: absolute;
        gap: v.$spacing-def;
        transition: left 0.25s;
    }

    .chatEntriesContainer{
        width: 100%;
        height: calc(100vh - 99px);
        display: flex;
    }
</style>