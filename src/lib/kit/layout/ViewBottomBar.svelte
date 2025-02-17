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
		setActive
	} from '$lib/scripts/chatViews';
</script>

<div class="viewBottomBar">
	<Button
		style={$isCloudStorageBar ? 2 : 0}
		action={() => {
			isCloudStorageBar.set(!$isCloudStorageBar);
		}}><Icon name={$isCloudStorageBar ? 'X' : 'Plus'} /></Button
	>
	<Textbox placeholder="Message General" icon="Chat" width="100%" />
	<Button
		style={$isContactsBar ? 2 : 0}
		action={() => {
			setActive('contacts');
		}}><Icon name={$isContactsBar ? 'X' : 'Users'} /></Button
	>
	<Button
		style={$isMapBar ? 2 : 0}
		action={() => {
			setActive('maps');
		}}><Icon name={$isMapBar ? 'X' : 'Location'} /></Button
	>
	<Button
		style={$isPollBar ? 2 : 0}
		action={() => {
			setActive('polls');
		}}><Icon name={$isPollBar ? 'X' : 'Equalizer'} /></Button
	>
	<Button
		style={$isCommandBar ? 2 : 0}
		action={() => {
			setActive('commands');
		}}><Icon name={$isCommandBar ? 'X' : 'Terminal'} /></Button
	>
	<Button
		style={$isEmojiBar ? 2 : 0}
		action={() => {
			setActive('emoji');
		}}><Icon name={$isEmojiBar ? 'X' : 'Smile'} /></Button
	>
	<Button
		style={$isStickerBar ? 2 : 0}
		action={() => {
			setActive('stickers');
		}}><Icon name={$isStickerBar ? 'X' : 'StickyNotes'} /></Button
	>
	<Button
		style={$isGifBar ? 2 : 0}
		action={() => {
			setActive('gifs');
		}}><Icon name={$isGifBar ? 'X' : 'GIF'} /></Button
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
