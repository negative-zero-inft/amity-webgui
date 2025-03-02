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
	import Cluster from './Cluster.svelte';

	let message: string = $state('');
	let elements: HTMLDivElement | null = $state(null);
	let msgelements: HTMLDivElement | null = $state(null);
	let isPreview = $state(false);
	let previewButtonEvent: MouseEvent | null = $state(null);

	const sendMessage = () => {
		console.log(message);
		message = '';
	}	

	$effect(() => {
		if(message.length == 0){
			isPreview = false;
		}
	})

</script>

<div class="viewBottomBar">
		
	<div class="recordingElements" style={
		$isRecording ? 'width: 100%; position: relative; opacity: 1; pointer-events: auto;' : 
		'width: 0px; position: absolute; opacity: 0; pointer-events: none;'
		}>
		<Button action={() => {isRecording.set(!$isRecording)}} style={3}><Icon name="X"></Icon></Button>
		<RecordingBar timestamp={$isRecording ? new Date().getTime() + 1 : new Date().getTime() + 1}></RecordingBar>
	</div>
	<Button
		width="36px"
		style={$isCloudStorageBar ? 2 : 0}
		action={() => {
			setActive("cloud")
		}}>
		<Icon name={$isCloudStorageBar ? 'X' : 'Plus'} />
	</Button>
	<TextArea 
		style="max-height: calc(100vh - 20px);"
		onkeydown={(e: KeyboardEvent) => {
			if(e.key === 'Enter' && e.shiftKey){
				
			}else if(e.key === 'Enter'){
				e.preventDefault();
				sendMessage()
			}else if(e.key === 'Escape'){
				message = '';
			}
		}}
		zIndex={12837} 
		bgc="#00000080; backdrop-filter: blur(40px);" 
		bind:value={message}
		height={message.includes('\n') ? message.split('\n').length * 15 + 20 + 'px' : '36px'} 
		placeholder="Message General" 
		icon={message.includes('\n') ? '' : 'Chat'} 
		width="100%" 
	/>
	<div bind:this={msgelements} class="elements-horiz" style="
	position: {message.length > 0 ? 'relative' : 'absolute'};
	right: {message.length > 0 ? 0 : 0 - (msgelements?.offsetWidth || 0)}px;
	transition: 0.25s;
	z-index: 12837;
	">
		<Button
			tooltip="Preview message"
			width="36px"
			style={isPreview ? 2 : 0}
			action={(e: MouseEvent) => {
				isPreview = !isPreview;
				previewButtonEvent = e;
			}}
		>
			<Icon name={'Eye'} />
		</Button>
		<Button
			tooltip="Emoji"
			width="36px"
			style={$isEmojiBar ? 2 : 0}
			action={() => {
				setActive('emoji');
			}}
		>
			<Icon name={$isEmojiBar ? 'X' : 'Smile'} />
		</Button>
		<Button
			tooltip="Send"
			width="36px"
			style={1}
			action={() => {
				sendMessage();
			}}
		>
			<Icon name='Send' />
		</Button>
		<div class="window" style="
			scale: {isPreview ? 1 : 0};
			position: absolute;
			right: {isPreview ? 0 : (36 * 2) + 10}px;
			bottom: {isPreview ? 56 : -16}px;
			background-color: #00000080;
			backdrop-filter: blur(40px);
			border-radius: 25px 25px 15px 25px;
		">
			<Cluster messages={[message]}></Cluster>
		</div>
	</div>
	<div bind:this={elements} class="elements-horiz" style="
		position: {message.length > 0 ? 'absolute' : 'relative'};
		right: {message.length > 0 ? 0 - (elements?.offsetWidth || 0) : 0}px;
		transition: 0.25s;
		z-index: 12837;
	">
		<Button
			tooltip="Contacts"
			width="36px"
			style={$isContactsBar ? 2 : 0}
			action={() => {
				setActive('contacts');
		}}><Icon name={$isContactsBar ? 'X' : 'Users'} /></Button
		>
		<Button
			tooltip="Location"
			width="36px"
			style={$isMapBar ? 2 : 0}
			action={() => {
				setActive('maps');
			}}><Icon name={$isMapBar ? 'X' : 'Location'} /></Button
		>
		<Button
			tooltip="Polls"
			width="36px"
			style={$isPollBar ? 2 : 0}
			action={() => {
				setActive('polls');
			}}><Icon name={$isPollBar ? 'X' : 'Equalizer'} /></Button
		>
		<Button
			tooltip="Apps & commands"
			width="36px"
			style={$isCommandBar ? 2 : 0}
			action={() => {
				setActive('commands');
			}}><Icon name={$isCommandBar ? 'X' : 'Terminal'} /></Button
		>
		<Button
			tooltip="Emoji"
			width="36px"
			style={$isEmojiBar ? 2 : 0}
			action={() => {
				setActive('emoji');
			}}><Icon name={$isEmojiBar ? 'X' : 'Smile'} /></Button
		>
		<Button
			tooltip="Stickers"
			width="36px"
			style={$isStickerBar ? 2 : 0}
			action={() => {
				setActive('stickers');
			}}><Icon name={$isStickerBar ? 'X' : 'StickyNotes'} /></Button
		>
		<Button
			tooltip="Gifs"
			width="36px"
			style={$isGifBar ? 2 : 0}
			action={() => {
				setActive('gifs');
			}}><Icon name={$isGifBar ? 'X' : 'GIF'} /></Button
		>
		<Button
			tooltip="Record a voice message"
			width="36px"
			style={$isRecording ? 1 : 0}
			action={() => {
				isRecording.set(!$isRecording)
			}}><Icon name={$isRecording ? 'Send' : 'Microphone'} /></Button
		>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.recordingElements{
		transition: 0.25s;
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
	}

	.elements-horiz{
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
	}

	.viewBottomBar {
		position: relative;
		overflow-y: visible !important;
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
