<script lang="ts">
	import Button from '../Button.svelte';
	import Icon from '../Icon.svelte';
	import Textbox from '../Textbox.svelte';

	import {
		isCloudStorageBar,
		isContactsBar,
		isMapBar,
		isPollBar,
		isCommandBar,
		isEmojiBar,
		isStickerBar,
		isGifBar,
		setActive,
		isRecording

	} from '$lib/scripts/chatViews';
	import RecordingBar from '../RecordingBar.svelte';
</script>

<div class="viewBottomBar">
	{#if $isRecording}
		<Button action={() => {isRecording.set(!$isRecording)}} style={3}><Icon name="X"></Icon></Button>
		<RecordingBar></RecordingBar>
	{:else}
		<Button
		width="36px"
		style={$isCloudStorageBar ? 2 : 0}
		action={() => {
			setActive("cloud")
		}}><Icon name={$isCloudStorageBar ? 'X' : 'Plus'} /></Button
		>
		<Textbox placeholder="Message General" icon="Chat" width="100%" />
		<Button
			width="36px"
			style={$isContactsBar ? 2 : 0}
			action={() => {
				setActive('contacts');
			}}><Icon name={$isContactsBar ? 'X' : 'Users'} /></Button
		>
		<Button
			width="36px"
			style={$isMapBar ? 2 : 0}
			action={() => {
				setActive('maps');
			}}><Icon name={$isMapBar ? 'X' : 'Location'} /></Button
		>
		<Button
			width="36px"
			style={$isPollBar ? 2 : 0}
			action={() => {
				setActive('polls');
			}}><Icon name={$isPollBar ? 'X' : 'Equalizer'} /></Button
		>
		<Button
			width="36px"
			style={$isCommandBar ? 2 : 0}
			action={() => {
				setActive('commands');
			}}><Icon name={$isCommandBar ? 'X' : 'Terminal'} /></Button
		>
		<Button
			width="36px"
			style={$isEmojiBar ? 2 : 0}
			action={() => {
				setActive('emoji');
			}}><Icon name={$isEmojiBar ? 'X' : 'Smile'} /></Button
		>
		<Button
			width="36px"
			style={$isStickerBar ? 2 : 0}
			action={() => {
				setActive('stickers');
			}}><Icon name={$isStickerBar ? 'X' : 'StickyNotes'} /></Button
		>
		<Button
			width="36px"
			style={$isGifBar ? 2 : 0}
			action={() => {
				setActive('gifs');
			}}><Icon name={$isGifBar ? 'X' : 'GIF'} /></Button
		>
	{/if}
	<Button
		width="36px"
		style={$isRecording ? 1 : 0}
		action={() => {
			isRecording.set(!$isRecording)
		}}><Icon name={$isRecording ? 'Send' : 'Microphone'} /></Button
	>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.viewBottomBar {
		display: flex;
		flex-direction: row;
		padding: v.$spacing-def;
		gap: v.$spacing-def;
		width: 100%;
		box-sizing: border-box;
	}
</style>
