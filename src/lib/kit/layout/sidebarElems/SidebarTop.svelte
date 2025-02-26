<script lang="ts">
	import AvatarStack from '$lib/kit/AvatarStack.svelte';
	import Button from '$lib/kit/Button.svelte';
	import Icon from '$lib/kit/Icon.svelte';
	import NewFolder from './NewFolder.svelte';
	import { isNewFolder, isUserBar, newFolderE, windowClickEvent, isFolderCtxMenu, folderClickEvent, folder } from '$lib/scripts/chatViews';
	import { user } from '$lib/scripts/globalData';
	import FolderCtxMenu from './FolderCtxMenu.svelte';

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
		<Button><Icon name="Search" /></Button>
	</div>
	<div class="scroll-horiz" bind:this={scrollContainer} onwheel={handleWheel}>
		<Button style={6}><Icon name="Chat" />All chats</Button>
		{#each $user?.chat_folders || [] as child}
			<Button
				hoverAction={(e: MouseEvent) => {
					if (!$isFolderCtxMenu) folderClickEvent.set(e);
				}}
				contextmenu={(e: MouseEvent) => {
					e.preventDefault();
					isFolderCtxMenu.set(false);
					folderClickEvent.set(e)
					folder.set(child)
					isFolderCtxMenu.set(true);
				}}
				style={4}><Icon name={child.icon} />{child.name || ''}</Button
			>
		{/each}
		<Button
			hoverAction={(e: MouseEvent) => {
				newFolderE.set(e);
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
<FolderCtxMenu></FolderCtxMenu>

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

	.elem-horiz {
		display: flex;
		gap: v.$spacing-def;
		align-items: center;
	}
</style>
