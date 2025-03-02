<script lang="ts">
	import AvatarStack from '$lib/kit/decor/AvatarStack.svelte';
	import Button from '$lib/kit/Button.svelte';
	import Icon from '$lib/kit/Icon.svelte';
	import NewFolder from './NewFolder.svelte';
	import { isNewFolder, isUserBar, newFolderE, isFolderCtxMenu, folderClickEvent, folder, isMoreButtonCtxMenu, moreButtonClickEvent } from '$lib/scripts/chatViews';
	import { user } from '$lib/scripts/globalData';
	import { currentFolder, previousFolder } from '$lib/scripts/chatViews';
	let scrollContainer: HTMLDivElement | undefined;

	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		if (!scrollContainer) return; // Guard clause

		const delta = Math.sign(event.deltaY);
		const scrollSpeed = 150;

		scrollContainer.scrollLeft += delta * scrollSpeed;
	}

	const newfolderscrollthing = (e: MouseEvent) => {
		if (!scrollContainer) return;
		scrollContainer.scrollLeft = scrollContainer?.scrollWidth;

		isNewFolder.set(!$isNewFolder);
		newFolderE.set(e);
	};

</script>

<div class="sidebar-top">
	<div
		class="elements-horiz"
		style="
        width: calc(100% - 20px);
        justify-content: space-between; 
        padding-right: 10px; 
        padding-left: 10px;"
	>
		<Button
			action={() => {
				$isUserBar = true;
			}}><Icon name="Hamburger" /></Button
		>
		<Button>
			<Icon name="Camera/Video" />
			<span class="avatarstack">
				Stories <AvatarStack avatar2={'guitar.png'} avatar3={'amity.png'} />
			</span>
		</Button>
		<Button 
			hoverAction={(e: MouseEvent) => {
				if (!$isMoreButtonCtxMenu) moreButtonClickEvent.set(e);
			}}
			action={(e: MouseEvent) => {
				isMoreButtonCtxMenu.set(false);
				moreButtonClickEvent.set(e)
				isMoreButtonCtxMenu.set(true);
			}}
		><Icon name="More" /></Button>
	</div>
	<div class="scroll-horiz" bind:this={scrollContainer} onwheel={handleWheel}>
		<Button action={()=>{
			previousFolder.set({
				name: $currentFolder.name,
				icon: $currentFolder.icon,
				_id: $currentFolder._id,
				elements: $currentFolder.elements,
				index: $currentFolder.index
			})
			currentFolder.set({
				name: "All chats",
				icon: "Chat",
				_id: "AC",
				elements: $user?.chats.map((e: any) => e._id) || [],
				index: 0
			})
		}} style={$currentFolder._id == "AC" ? 6 : 4}><Icon name="Chat" />All chats</Button>
		{#each $user?.chat_folders || [] as child}
			<Button
				action={()=>{
					previousFolder.set({
						name: $currentFolder.name,
						icon: $currentFolder.icon,
						_id: $currentFolder._id,
						elements: $currentFolder.elements,
						index: $currentFolder.index
					})
					currentFolder.set({
						name: child.name,
						icon: child.icon,
						_id: child._id,
						elements: child.elements.map((e: any) => e?.id) || [],
						index: $user?.chat_folders.findIndex((e: any) => e._id == child._id) + 1 || 0
					})
				}}
				id="folderButton"
				hoverAction={(e: MouseEvent) => {
					if (!$isFolderCtxMenu) folderClickEvent.set(e);
				}}
				contextmenu={(e: MouseEvent) => {
					e.preventDefault();
					isFolderCtxMenu.set(false);
					folderClickEvent.set(e)
					folder.set((child as any))
					isFolderCtxMenu.set(true);
				}}
				style={$currentFolder._id == child._id ? 6 : 4}><Icon name={child.icon} />{child.name || ''}</Button
			>
		{/each}
		<Button
			hoverAction={(e: MouseEvent) => {
				if(!$isNewFolder) newFolderE.set(e);
			}}
			action={(e: MouseEvent) => {
				newfolderscrollthing(e);
			}}
			style={$isNewFolder ? 6 : 4}
		>
			<Icon name={$isNewFolder ? 'X' : 'Plus'} />{$isNewFolder ? 'Close' : 'New folder'}
		</Button>
	</div>
	<NewFolder></NewFolder>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.avatarstack {
		display: inline-flex;
		gap: -2px;
		align-items: center;
	}

	.scroll-horiz {
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		overflow-x: scroll;
		padding-right: v.$spacing-def;
		padding-left: v.$spacing-def;
		height: v.$chip-height;
		align-items: center;
		scroll-behavior: smooth;
		padding-bottom: 5px;
		padding-top: 5px;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	.sidebar-top {
		flex-direction: column;
		display: flex;
		padding: v.$spacing-def;
		padding-right: 0px;
		padding-left: 0px;
		padding-bottom: 5px;
		gap: 5px;
	}
</style>
