<script lang="ts">
	import Button from '../Button.svelte';
	import Icon from '../Icon.svelte';
	import TextArea from '$lib/kit/Textarea.svelte';

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

	let message: string = $state('');
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
		<TextArea 
			zIndex={12837} 
			bgc="black" 
			bind:value={message} 
			height={message.includes('\n') ? message.split('\n').length * 15 + 20 + 'px' : '36px'} 
			placeholder="Message General" 
			icon={message.length > 0 ? '' : 'Chat'} 
			width="100%" 
		/>
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
		height: 56px;
		bottom: 0px;
		flex-shrink: 0;
		display: flex;
		flex-direction: row;
		padding: v.$spacing-def;
		gap: v.$spacing-def;
		width: 100%;
		box-sizing: border-box;
		align-items: flex-end;
	}
</style>
