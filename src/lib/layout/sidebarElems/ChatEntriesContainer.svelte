<script lang="ts">
	import { isFirefox } from '$lib/scripts/isFirefox';
	import ChatEntry from '../../ChatEntry.svelte';
	import { user } from '$lib/scripts/globalData';
    import { isHttps, port, server, token } from "$lib/scripts/globalData";
	import { currentChat } from '$lib/scripts/chatViews';
	import { currentFolder, previousFolder } from '$lib/scripts/chatViews';

	let isReallyFireFox = $state<boolean>(false);
	$effect(() => {
		isReallyFireFox = isFirefox();
	});

</script>

<div class="chatEntriesContainer">
	<div id="allChats" class="chatEntries" style="
		--pr: {isReallyFireFox ? 10 : 5}px;
		left: {$currentFolder._id == "AC" ? 0 : -320}px;
	">
		{#each $user?.chats || [] as child} 
			<!-- magic -->

			<ChatEntry isSidebar={true} data={child}></ChatEntry>
		{/each}
	</div>
	{#each $user?.chat_folders || [] as child}
		<div id="allChats" class="chatEntries" style="
			--pr: {isReallyFireFox ? 10 : 5}px;
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
				<!-- magic -->
				<ChatEntry isSidebar={true} data={chatentry}></ChatEntry>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.chatEntriesContainer {
		width: 100%;
		height: 100%;
	}

	.chatEntries {
		transition: left 0.25s;
		width: 320px;
		position: absolute;
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
