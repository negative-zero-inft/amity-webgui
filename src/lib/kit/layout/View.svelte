<script lang="ts">
	import Avatar from '../Avatar.svelte';
	import Button from '../Button.svelte';
	import Message from '../Message.svelte';
	import ChatInfoSidebar from './chatsidebars/ChatInfoSidebar.svelte';
	import CloudStorageBar from './chatsidebars/CloudStorageSidebar.svelte';
	import CommandSidear from './chatsidebars/CommandSidear.svelte';
	import ContactsSidebar from './chatsidebars/ContactsSidebar.svelte';
	import EmojiSidebar from './chatsidebars/EmojiSidebar.svelte';
	import GifsSidebar from './chatsidebars/GifsSidebar.svelte';
	import MapSidebar from './chatsidebars/MapSidebar.svelte';
	import PollSidebar from './chatsidebars/PollSidebar.svelte';
	import StickerSidebar from './chatsidebars/StickerSidebar.svelte';

	import {
		isCloudStorageBar,
		isContactsBar,
		isMapBar,
		isPollBar,
		isCommandBar,
		isEmojiBar,
		isStickerBar,
		isGifBar,
	} from '$lib/scripts/chatViews';
	
	import ViewBottomBar from './ViewBottomBar.svelte';
	import ViewTopBar from './ViewTopBar.svelte';
</script>

<div class="view">
	<ViewTopBar />
	<hr class="separator" />
	<div class="subView">
		<CloudStorageBar></CloudStorageBar>
		<div class="userView">
			<div class="chatView">
				<div class="clusterForeign">
					<Avatar></Avatar>
					<div class="clusterMessages">
						<Message>skibidi toilet</Message>
						<Message isClustered={true}
							>skibidi toilet
							asdihlas;udflu.oij;sduoilphasdfuopilhawsdfluoihbasdlofbasdbflkasdbflgikasdbvliasbdloivbasibvkijsdafbvgjknabsdfkhjv
							bkjdafxbvhbasdfvjkhasdbvjkhasdbfdvgljkasdbfvkljh</Message
						>
					</div>
				</div>
				<div class="clusterOwn">
					<div class="clusterMessages" style="align-items: flex-end">
						<Message isSender={true}
							>skibidi toilet
							;jksfdhngluoij;fdgluijfsdnbluijfsdgluijbsdhnikbfhsdglikfhsdnklijsdfhlkivshndkligfsdhoikgsdfhbvuigzdxuhkfgbfsdxuvbsdhvhboikhsfdhbvoihsdvniuynsdcvoiuhasdvoijhnadxcouivbjhsvcxb
							uibtvx,keshgj,kxlcyiur.,dkthikg9ifr0gol;4[wp;.r,t4iljo567vj6g87ridus5retreg78657h]</Message
						>
						<Message isClustered={true} isSender={true}>skibidi toilet</Message>
					</div>
				</div>
			</div>
			<hr class="separator" />
			<ViewBottomBar />
		</div>
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
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.clusterMessages {
		display: flex;
		flex-direction: column;
		gap: v.$spacing-msg;
	}

	.clusterForeign {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: v.$spacing-msg;
		align-items: flex-end;
	}

	.clusterOwn {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: flex-end;
		gap: v.$spacing-msg;
	}

	.userView {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.subView {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}

	.chatView {
		height: 100%;
		width: 100%;
		overflow: scroll;
		display: flex;
		flex-direction: column-reverse;
		padding: v.$spacing-def;
		gap: v.$spacing-def;
		box-sizing: border-box;
	}

	.view {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
</style>
