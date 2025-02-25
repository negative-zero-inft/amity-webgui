<script lang="ts">
	import Button from '$lib/kit/Button.svelte';
	import Sticker from '$lib/kit/Sticker.svelte';
	import Emoji from '$lib/kit/Emoji.svelte';
	import Icon from '$lib/kit/Icon.svelte';
	import Label from '$lib/kit/Label.svelte';
	import Textbox from '$lib/kit/Textbox.svelte';

	import { isStickerBar } from '$lib/scripts/chatViews';
	let animatedSidebar: number = 0;

	$: {
		if ($isStickerBar) {
			animatedSidebar = 320;
		} else {
			animatedSidebar = 0;
		}
	}

	let scrollContainer: HTMLDivElement | undefined;

	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		if (!scrollContainer) return; // Guard clause

		const delta = Math.sign(event.deltaY);
		const scrollSpeed = 150;

		scrollContainer.scrollLeft += delta * scrollSpeed;
	}
</script>

<div class="bar" style="--w: {animatedSidebar}px">
	<div class="topBar">
		<Textbox width="100%; background-color: black;" icon="Search" placeholder="Search stickers..."
		></Textbox>
		<Button><Icon name="Plus"></Icon></Button>
	</div>
	<!-- <hr class="separator"/> -->
	<div class="emojiList">
		<Label icon="Star" label="Favorites"></Label>
		<grid class="emojiGrid">
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="moreButton"><Button><Icon name="More"></Icon></Button></div>
		</grid>
		<Label icon="Clock" label="Recent"></Label>
		<grid class="emojiGrid">
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="centered"><Sticker></Sticker></div>
			<div class="moreButton"><Button><Icon name="More"></Icon></Button></div>
		</grid>
	</div>
	<hr class="separator" />
	<div class="bottomBar" bind:this={scrollContainer} onwheel={handleWheel}>
		<Button style={2}><Icon name="Star"></Icon></Button>
		<Button><Icon name="Clock"></Icon></Button>
		<hr class="smallSeparator" style="height: 10px;" />
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
		<Button width="36px"><Emoji></Emoji></Button>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.moreButton {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.centered {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.25s;
	}
	.centered:hover {
		transform: scale(1.1);
	}
	.centered:active {
		transform: scale(0.9);
		transition: 0.1s;
	}

	.emojiGrid {
		display: grid;
		grid-template-columns: repeat(5, 1fr); /* 7 equal-width columns */
		grid-template-rows: repeat(3, 1fr); /* 3 equal-height rows */
		gap: 0px; /* Initial gap, will be overridden */
		width: 100%; /* Or a specific width */
		height: max-content; /* Or a specific height */
	}
	.smallSeparator {
		color: c.$text-25;
		margin: 0;
	}
	.emojiList {
		width: 320px;
		height: calc(100vh - 2px - 56px * 3);
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		overflow: auto;
		scroll-behavior: smooth;
		padding: v.$spacing-def;
		box-sizing: border-box;
		padding-top: 56px;
		gap: v.$spacing-def;
	}
	.bottomBar {
		width: 320px;
		padding: v.$spacing-def;
		flex-shrink: 0;
		height: 56px;
		box-sizing: border-box;
		background-color: c.$bg;
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		align-items: center;
		overflow: scroll;
		scroll-behavior: smooth;
		padding-right: 60px;
		&::-webkit-scrollbar{
			display: none;
		}
	}
	.topBar {
		width: 320px;
		height: 56px;
		box-sizing: border-box;
		padding: v.$spacing-def;
		flex-shrink: 0;
		background: linear-gradient(to bottom, #000000ff 50%, #00000000);
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		position: absolute;
		z-index: 69696969;
		left: 0;
	}

	.bar {
		@include v.sidebar;
	}
</style>
