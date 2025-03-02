<script lang="ts">
	import Icon from "$lib/kit/decor/Icon.svelte";
	import Button from "$lib/kit/gizmos/Button.svelte";
	import StoriesButton from "$lib/kit/gizmos/StoriesButton.svelte";
    import { isUserBar } from "$lib/scripts/chatViews";
    import { currentFolder, previousFolder } from "$lib/scripts/chatViews";
	import { user } from "$lib/scripts/globalData";
    import { _ } from "svelte-i18n";

    let scrollContainer: HTMLElement | null = null;

    function handleWheel(event: WheelEvent) {
		event.preventDefault();

		if (!scrollContainer) return; // Guard clause

		const delta = Math.sign(event.deltaY);
		const scrollSpeed = 150;

		scrollContainer.scrollLeft += delta * scrollSpeed;
	}

</script>

<div class="sidebarTop">
    <div 
        class="elem-horiz"
        style="
            padding: 10px;
            padding-bottom: 5px;
            gap: 10px;
            justify-content: space-between;
        "
    >
        <Button
            action={()=>{isUserBar.set(true)}}
        >
            <Icon name="Hamburger"/>
        </Button>
        <StoriesButton/>
        <Button>
            <Icon name="More"/>
        </Button>
    </div>
    <div
        onwheel={(event:WheelEvent)=>{handleWheel(event)}}
        bind:this={scrollContainer}
        id="folderBar"
        class="elem-horiz"
    >
        <Button
            action={()=>{
                previousFolder.set($currentFolder)
                currentFolder.set({
                    name: "All chats",
                    icon: "Chat",
                    _id: "AC",
                    elements: $user?.chat_folders[0].elements as any,
                    index: 0
                });
            }}
            style={$currentFolder._id == "AC" ? "selected" : "default"} 
            isChip
        >
            <Icon name="Chat"/>
            {$_("sidebar.allChats")}
        </Button>
        {#each $user?.chat_folders as folder}
            <Button
                style={$currentFolder._id == folder._id ? "selected" : "default"}
                action={()=>{
                    previousFolder.set($currentFolder)
                    currentFolder.set({
                        name: folder.name,
                        icon: folder.icon,
                        _id: folder._id,
                        elements: folder.elements as any,
                        index: $user.chat_folders.indexOf(folder) + 1
                    });
                }}
                isChip
            >
                <Icon name={folder.icon}/>
                {folder.name}
            </Button>
        {/each}
        <Button
            isChip    
        >
            <Icon name="Plus"/>
            {$_("sidebar.newFolder")}
        </Button>
    </div>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;
    
    #folderBar{
        padding: 10px;
        padding-top: 5px;
        overflow-x: auto;
        scroll-behavior: smooth;
    }
    .sidebarTop{
        display: flex;
        flex-direction: column;
    }
</style>