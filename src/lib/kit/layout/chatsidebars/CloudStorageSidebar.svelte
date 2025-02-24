<script lang="ts">
	import Button from '$lib/kit/Button.svelte';
	import Emoji from '$lib/kit/Emoji.svelte';
	import Icon from '$lib/kit/Icon.svelte';
	import Label from '$lib/kit/Label.svelte';
	import Textbox from '$lib/kit/Textbox.svelte';

	import { isCloudStorageBar } from '$lib/scripts/chatViews';
	import Command from '$lib/kit/Command.svelte';
	let animatedSidebar: number = $state(0);

	$effect(() => {
		if ($isCloudStorageBar) {
			animatedSidebar = 320;
		} else {
			animatedSidebar = 0;
		}
	});

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
	{#if $isCloudStorageBar}
		<div class="topBar">
			<Textbox width="100%; background-color: black;" icon="Search" placeholder="Search your files..."></Textbox>
		</div>
	{/if}
	<!-- <hr class="separator"/> -->
	<div class="emojiList">
		<Label icon="Star" label="Favorites"></Label>
		<grid class="emojiGrid">
			<Button alignment="flex-start" width="100%"><Icon name="Docs"></Icon> 1984.pdf</Button>
			<Button width="100%">
				<div style="width: 100px; display: flex; flex-direction: row; gap: 10px; align-items: center;">
					<Icon name="Camera/Video"></Icon>
					skibidi.mp4
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button>
			<Button width="100%">
				<div style="width: 100px; display: flex; flex-direction: row; gap: 10px; align-items: center;">
					<Icon name="Camera/Video"></Icon>
					egg.mp4
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button>
			<Button width="100%">
				<div style="width: 100px; display: flex; flex-direction: row; gap: 10px; align-items: center;">
					<Icon name="Image"></Icon>
					asdnasldj.png
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button>
			<Button width="100%">
				<div style="width: 100px; display: flex; flex-direction: row; gap: 10px; align-items: center;">
					<Icon name="Image"></Icon>
					blolb.webp
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button>
			<Button width="100%"><Icon name="More"></Icon>More</Button>
		</grid>
		<Label icon="Clock" label="Recent"></Label>
		<grid class="emojiGrid">
			<Button alignment="flex-start" width="100%"><Icon name="Docs"></Icon> 1984.pdf</Button>
			<Button width="100%">
				<div style="width: 100px; display: flex; flex-direction: row; gap: 10px; align-items: center;">
					<Icon name="Camera/Video"></Icon>
					skibidi.mp4
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button>
			<Button width="100%">
				<div style="width: 100px; display: flex; flex-direction: row; gap: 10px; align-items: center;">
					<Icon name="Camera/Video"></Icon>
					egg.mp4
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button>
			<Button width="100%">
				<div style="width: 100px; display: flex; flex-direction: row; gap: 10px; align-items: center;">
					<Icon name="Image"></Icon>
					asdnasldj.png
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button>
			<Button width="100%">
				<div style="width: 100px; display: flex; flex-direction: row; gap: 10px; align-items: center;">
					<Icon name="Image"></Icon>
					blolb.webp
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button>
			<Button width="100%"><Icon name="More"></Icon>More</Button>
		</grid>
	</div>
	<hr class="separator" />
	<div class="bottomBar" bind:this={scrollContainer} onwheel={handleWheel}>
		<Button style={2}><Icon name="Star"></Icon></Button>
		<Button><Icon name="Clock"></Icon></Button>
		<hr class="smallSeparator" style="height: 10px;" />
		<Button width="max-content"><Icon name="Docs"></Icon> Documents</Button>
		<Button width="max-content"><Icon name="Image"></Icon> Pictures</Button>
		<Button width="max-content"><Icon name="Music"></Icon> Audio</Button>
		<Button width="max-content"><Icon name="Camera/Video"></Icon> Videos</Button>
	</div>
</div>
{#if $isCloudStorageBar}
	<hr class="separator" />
{/if}

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.smallSeparator {
		color: c.$text-25;
		border-color: c.$text-25;
		margin: 0;
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
		align-items: center;
		gap: v.$spacing-def;
		overflow: scroll;
		scroll-behavior: smooth;
	}

	.emojiGrid {
		display: grid;
		grid-template-columns: repeat(2, 1fr); /* 7 equal-width columns */
		grid-template-rows: repeat(3, 1fr); /* 3 equal-height rows */
		gap: v.$spacing-def; /* Initial gap, will be overridden */
		width: 100%; /* Or a specific width */
		height: max-content; /* Or a specific height */
	}
	.emojiList {
		height: calc(100vh - 2px - 56px * 3);
		width: 320px;
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
		left: 321px;
	}

	.bar {
		@include v.sidebar;
	}
</style>
