<script lang="ts">
	import { writable } from 'svelte/store';
	import AvatarStack from '../AvatarStack.svelte';
	import Button from '../Button.svelte';
	import ChatEntry from '../ChatEntry.svelte';
	import Icon from '../Icon.svelte';
	import Userbar from './Userbar.svelte';

	import { isFirefox } from '$lib/scripts/isFirefox';
	import { setContext } from 'svelte';
	import { isUserBar, isNewFolder, newFolderE } from '$lib/scripts/chatViews';
	import { user } from '$lib/scripts/globalData';
	import NewFolder from './sidebarElems/NewFolder.svelte';

	let scrollContainer: HTMLDivElement | undefined;

	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		if (!scrollContainer) return; // Guard clause

		const delta = Math.sign(event.deltaY);
		const scrollSpeed = 150;

		scrollContainer.scrollLeft += delta * scrollSpeed;
	}

	setContext('isUserBar', isUserBar);

	let isReallyFireFox = $state<boolean>(false);
	$effect(() => {
		isReallyFireFox = isFirefox();
	});
</script>

<Userbar />
<div
	class="sidebar"
	style="--u: {$isUserBar ? 0.9 : 1}; --o: {$isUserBar ? 0.25 : 1}; --r: {$isUserBar ? 1 : 0}"
>
	<div class="sidebar-top">
		<div
			class="elements-horiz"
			style="
            width: 300px;
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
				<Button style={4}><Icon name={child.icon} />{child.name}</Button>
			{/each}
			<Button action={(e: MouseEvent)=>{
				isNewFolder.set(!$isNewFolder)
				newFolderE.set(e)
			}} style={4}><Icon name="Plus" />New folder</Button>
			<NewFolder></NewFolder>
		</div>
	</div>
	<hr class="separator" />
	<div class="chatEntriesContainer">
		<div id="allChats" class="chatEntries" style="--pr: {isReallyFireFox ? 10 : 5}px">
			{#each $user?.chats || [] as child}
				<!-- magic -->
				<script lang="ts">
					
				</script>
				<ChatEntry></ChatEntry>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;
	
	.chatEntriesContainer{
		width: 320px;
		height: 100%;
	}

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

	.sidebar {
		height: 100%;
		width: 320px;
		display: flex;
		flex-direction: column;
		opacity: var(--o);
		scale: var(--u);
		transition: 0.25s;
		transform: rotate3d(0, var(--r), 0, 90deg);
	}

	.chatEntries {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		padding: v.$spacing-def;
		padding-right: var(--pr);
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
		flex-shrink: none;
		box-sizing: border-box;
		scrollbar-gutter: stable;
	}
</style>
