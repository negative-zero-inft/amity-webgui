<script lang="ts">
	import Button from '$lib/kit/Button.svelte';
	import Sticker from '$lib/kit/Sticker.svelte';
	import Icon from '$lib/kit/Icon.svelte';
	import Label from '$lib/kit/Label.svelte';
	import Textbox from '$lib/kit/Textbox.svelte';

	import { isGifBar } from '$lib/scripts/chatViews';
	let animatedSidebar: number = $state(0);

	$effect(() => {
		if ($isGifBar) {
			animatedSidebar = 320;
		} else {
			animatedSidebar = 0;
		}
	});
</script>

<div class="bar" style="--w: {animatedSidebar}px">
	<div class="topBar">
		<Textbox width="100%" bgc="black" icon="Search" placeholder="Search gifs..."
		></Textbox>
	</div>
	<!-- <hr class="separator"/> -->
	<div class="emojiList">
		<Label icon="Star" label="Favorites"></Label>
		<grid class="emojiGrid">
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<div class="moreButton"><Button><Icon name="More"></Icon>More</Button></div>
		</grid>
		<Label icon="Clock" label="Recent"></Label>
		<grid class="emojiGrid">
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<img
				alt="gif"
				src="https://media.tenor.com/fW2_TC-J-1EAAAAj/letter-h-dance.gif"
				class="centered"
			/>
			<div class="moreButton"><Button><Icon name="More"></Icon>More</Button></div>
		</grid>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.moreButton {
		width: 100%;
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.centered {
		width: 100%;
		height: 70px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.25s;
		border-radius: v.$corner-elem;
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
		grid-template-columns: repeat(3, 1fr); /* 7 equal-width columns */
		grid-template-rows: repeat(3, 1fr); /* 3 equal-height rows */
		gap: 5px; /* Initial gap, will be overridden */
		width: 100%; /* Or a specific width */
		height: max-content; /* Or a specific height */
	}
	.emojiList {
		width: 320px;
		height: calc(100vh - 2px - 56px * 2);
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
		z-index: 69696969;
		left: 0;
	}

	.bar {
		@include v.sidebar;
	}
</style>
