<script>
	import Button from '../Button.svelte';
	import Icon from '../Icon.svelte';
	import Textbox from '../Textbox.svelte';

	let { chatName = 'General', subtitle = 'Negative Zero' } = $props();

	import { isChatInfo, setActive } from '$lib/scripts/chatViews';
</script>

<div class="viewTopBar">
	<div class="chatNameContainer">
		<div class="iconContainer">
			<Icon name="Chat" />
		</div>
		<div class="chatName">
			<div>{chatName}</div>
			<div class="subtext">{subtitle}</div>
		</div>
	</div>
	<div class="elements-horiz" style="gap: 10px">
		<Button><Icon name="Pin/Angled" /></Button>
		<Textbox width="208px" placeholder="Search" icon="Search"></Textbox>
		<Button
			style={$isChatInfo ? 2 : 0}
			action={() => {
				setActive('info');
			}}><Icon name={$isChatInfo ? 'X' : 'Hamburger'} /></Button
		>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.subtext {
		color: c.$text-50;
	}
	.chatName {
		font-size: 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.chatNameContainer {
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
	}
	.iconContainer {
		width: v.$elem-height;
		height: v.$elem-height;
		border: 1px;
		border-color: c.$text-25;
		border-style: solid;
		border-radius: v.$corner-elem;
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.viewTopBar {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		padding: v.$spacing-def;
	}
</style>
