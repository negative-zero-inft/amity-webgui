<script lang="ts">
    import { isFirefox } from "$lib/scripts/isFirefox";
    import { user } from "$lib/scripts/globalData";
    import { currentChat, currentFolder, previousFolder } from "$lib/scripts/chatViews";
    import ChatEntry from "$lib/kit/gizmos/ChatEntry.svelte";
	import EmptyFolderList from "./EmptyFolderList.svelte";

    let container: HTMLElement | null = $state(null);
</script>

<div 
    class="chatEntriesContainer"
    bind:this={container}
>
    <div 
        id="allChats" 
        class="chatEntries" 
        style="
            padding-right: {isFirefox() ? 10 : 5}px;
            left: {$currentFolder._id == "AC" ? 0 : 0 - container?.clientWidth}px;
        "
    >
        {#if $user?.chats.length > 0}
            {#each $user?.chats || [] as child} 
                <ChatEntry isSelected={$currentChat.id.id == child.id.id && $currentChat.id.server == child.id.server} isSidebar={true} data={child}></ChatEntry>
            {/each}
        {:else}
            <EmptyFolderList/>
        {/if}
    </div>
    {#each $user?.chat_folders || [] as child}
        <div class="chatEntries" style="
            padding-right: {isFirefox() ? 10 : 5}px;
            left: {
                $currentFolder._id == child._id ? 0 : 
                $currentFolder.index > $user?.chat_folders.findIndex((e: any) => e._id == child._id) + 1 ? 0 - container.clientWidth : 
                $currentFolder.index < $user?.chat_folders.findIndex((e: any) => e._id == child._id) + 1 ? container.clientWidth : 
                0
            }px;
            opacity: {
                $currentFolder._id == child._id ? 1 : 
                $previousFolder._id == child._id ? 1 : 
                0
            }
        ">
            {#if child.elements.length > 0}
                {#each child.elements || [] as chatentry} 
                    <ChatEntry isSelected={$currentChat.id.id == chatentry.id.id && $currentChat.id.server == chatentry.id.server} isSidebar={true} data={chatentry}></ChatEntry>
                {/each}
            {:else}
                <EmptyFolderList isFolder/>
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .chatEntries{
        top: 0;
        width: 100%;
        height: calc(100vh - 99px);
        display: flex;
        flex-direction: column;
        padding: v.$spacing-def;
        box-sizing: border-box;
        position: absolute;
        gap: v.$spacing-def;
        transition: left 0.25s;
        overflow-y: scroll;
    }

    .chatEntriesContainer{
        position: relative;
        width: 100%;
        height: calc(100vh - 99px);
        display: flex;
    }
</style>