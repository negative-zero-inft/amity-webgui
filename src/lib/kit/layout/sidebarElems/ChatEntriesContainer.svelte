<script lang="ts">
	import { isFirefox } from '$lib/scripts/isFirefox';
	import ChatEntry from '../../ChatEntry.svelte';
	import { user } from '$lib/scripts/globalData';

	let isReallyFireFox = $state<boolean>(false);
	$effect(() => {
		isReallyFireFox = isFirefox();
	});
</script>

<div class="chatEntriesContainer">
	<div id="allChats" class="chatEntries" style="--pr: {isReallyFireFox ? 10 : 5}px">
		<ChatEntry username="example" isSelected={true}></ChatEntry>
		{#each $user?.chats || [] as child}
			<!-- magic -->
			<script lang="ts">
			</script>
			<ChatEntry></ChatEntry>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.chatEntriesContainer {
		width: 320px;
		height: 100%;
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
