<script lang="ts">
	import Label from '$lib/kit/decor/Label.svelte';
	import Textbox from '$lib/kit/text/Textbox.svelte';
	import {
		currentFolder,
		folderClickEvent,
		ctxFolder,
		folderCtxMenuView
	} from '$lib/scripts/chatViews';
	import { locale } from '$lib/scripts/globalData';
	import { locale as ilocale, locales } from 'svelte-i18n';
	import Icon from '$lib/kit/decor/Icon.svelte';
	import Button from '$lib/kit/gizmos/Button.svelte';
	import { user } from '$lib/scripts/globalData';
	import { draggable } from '@neodrag/svelte';

	let listLanguages = $state($locales);

	function onclick(e: any) {
		locale.set(e.target.value);
		ilocale.set(e.target.value);
	}

	let isVisible = $state(true);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="window"
	style="
		display: {isVisible ? 'flex' : 'none'};
		transition: 0s;
	"
	oncontextmenu={(e) => {
		e.preventDefault();
		isVisible = false;
	}}
    use:draggable
>
	<Label icon="Code" label="le epic dev window">
		<Label icon="Translate" label="Lingo switcher">
			<select name="cars" {onclick}>
				{#each listLanguages as lang}
					<option value={lang}>{lang}</option>
				{/each}
			</select>
		</Label>
		<Label icon="Code" label="debug thingies">
			<div class="elem-horiz">
				current folder: <Icon name={$currentFolder.icon} />
				{$currentFolder.name}
			</div>
			<Button
				width="100%"
				action={() => {
					console.log($user);
				}}
				scaleClick={0.95}
				scaleHover={1.05}
			>
				<Icon name="User" />
				view user
			</Button>
			<Button
				width="100%"
				action={() => {
					console.log($folderClickEvent);
				}}
				scaleClick={0.95}
				scaleHover={1.05}
			>
				<Icon name="Folder/Default" />
				view folder click event
			</Button>
			<Button
				width="100%"
				action={() => {
					console.log($ctxFolder, $folderCtxMenuView, $ctxFolder);
				}}
				scaleClick={0.95}
				scaleHover={1.05}
			>
				<Icon name="Folder/Default" />
				view folder ctx menu
			</Button>
		</Label>
		<Label icon="Hammer" label="Action">
			<Button
				width="100%"
				action={() => {
					localStorage.removeItem('tokens');
					window.location.replace('/login');
				}}
				scaleClick={0.95}
				scaleHover={1.05}
			>
				<Icon name="Exit" />
				Force sign out
			</Button>
		</Label>
	</Label>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.window {
		gap: v.$spacing-def;
		position: absolute;
		bottom: 10px;
		left: 10px;
		user-select: none;
	}
</style>
