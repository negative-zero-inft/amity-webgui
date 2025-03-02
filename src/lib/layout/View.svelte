<script lang="ts">
	import Avatar from '../Avatar.svelte';
	import Button from '../Button.svelte';
	import Message from '../Message.svelte';
	import ChatView from './ChatView.svelte';
	import ChatInfoSidebar from './chatsidebars/ChatInfoSidebar.svelte';
	import CloudStorageBar from './chatsidebars/CloudStorageSidebar.svelte';
	import CommandSidear from './chatsidebars/CommandSidear.svelte';
	import ContactsSidebar from './chatsidebars/ContactsSidebar.svelte';
	import EmojiSidebar from './chatsidebars/EmojiSidebar.svelte';
	import GifsSidebar from './chatsidebars/GifsSidebar.svelte';
	import MapSidebar from './chatsidebars/MapSidebar.svelte';
	import PollSidebar from './chatsidebars/PollSidebar.svelte';
	import StickerSidebar from './chatsidebars/StickerSidebar.svelte';

	import ViewBottomBar from './ViewBottomBar.svelte';
	import ViewTopBar from './ViewTopBar.svelte';
</script>

<div class="view">
	<ViewTopBar />
	<hr class="separator" />
	<div class="subView">
		<div class="userView">
			<CloudStorageBar></CloudStorageBar>
			<ChatView></ChatView>
			<hr class="separator" />
			<ContactsSidebar></ContactsSidebar>
			<MapSidebar></MapSidebar>
			<PollSidebar></PollSidebar>
			<CommandSidear></CommandSidear>
			<EmojiSidebar></EmojiSidebar>
			<StickerSidebar></StickerSidebar>
			<GifsSidebar></GifsSidebar>
			<ChatInfoSidebar></ChatInfoSidebar>
		</div>
		<hr class="separator" style="z-index: 2137" />
		<ViewBottomBar />
	</div>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.userView {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: calc(100vh - 2px - 56px * 2);
	}

	.subView {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.view {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
</style>
