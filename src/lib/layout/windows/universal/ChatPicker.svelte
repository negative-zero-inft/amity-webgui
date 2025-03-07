<script lang="ts">
	import Button from '$lib/kit/gizmos/Button.svelte';
	import Icon from '$lib/kit/decor/Icon.svelte';
	import {
		folderCtxMenuView,
		prevFolderCtxMenuView,
		ctxFolder,
		type folderType
	} from '$lib/scripts/chatViews';
	import Label from '$lib/kit/decor/Label.svelte';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import { isHttps, server, port, token, user } from '$lib/scripts/globalData';
	import Textbox from '$lib/kit/text/Textbox.svelte';
	import { iconList } from '$lib/scripts/requests';
	import { isFirefox } from '$lib/scripts/isFirefox';
	import ChatEntry from '$lib/kit/gizmos/ChatEntry.svelte';

	type Props = {
		height: number;
		width: number;
		view: any;
		prevView: any;
		elements: any;
		viewWidth: number;
	};

	let {
		height = $bindable(0),
		width = $bindable(0),
		viewWidth = $bindable(0),
		view = $bindable(),
		prevView = $bindable(),
		elements = $bindable()
	}: Props = $props();

	let ctxMenu: HTMLElement | null = $state(null);
	let isFurryfox = $state(false);
	$effect(() => {
		isFurryfox = isFirefox();
	});

	const left = () => {
		if ($view === 'chatPicker') {
			return 10;
		} else if ($prevView === 'chatPicker') {
			return 0 - viewWidth;
		} else {
			return viewWidth;
		}
	};
	const opacity = () => {
		if ($view == 'chatPicker') {
			return 1;
		} else if ($prevView == 'chatPicker') {
			return 1;
		} else {
			return 0;
		}
	};

	interface elemType {
		_id: string;
		chat_type: string;
		id: {
			id: string;
			server: string;
		};
	}
</script>

<div
	id="chatPickerView"
	class="defaultView"
	bind:clientHeight={height}
	bind:clientWidth={width}
	bind:this={ctxMenu}
	style="
        left: {left()}px;
        opacity: {opacity()};
    "
>
	<div class="chatPickerTop">
		<Button
			action={() => {
				view.set($prevView);
			}}><Icon name="Direction/Left"></Icon></Button
		>
		<Textbox bgc="black" width="100%" icon="Search" placeholder={$_('ctxMenus.searchChats')}
		></Textbox>
	</div>
	<div id="allChats" class="chatEntries" style="--pr: {isFurryfox ? 10 : 5}px">
		{#each $user?.chats || [] as child}
			<ChatEntry
				click={() => {
					if ($elements.find((e) => e.id.id == child.id.id && e.id.server == child.id.server)) {
						elements.set(
							$elements.filter((e) => e.id.id + e.id.server != child.id.id + child.id.server)
						);
					} else {
						elements.set([
							...$elements,
							{
								_id: child._id,
								chat_type: child.chat_type,
								id: {
									id: child.id.id,
									server: child.id.server
								}
							}
						]);
					}
				}}
				isSelected={$elements.find((e) => e.id.id == child.id.id && e.id.server == child.id.server)
					? true
					: false}
				data={child}
			></ChatEntry>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	#chatPickerView {
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		width: 280px;
		transition: 0.25s;
		height: 400px;
		overflow: visible;
	}

	.chatPicker {
		width: 100%;
		height: 400px;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		transition: 0.25s;
		position: absolute;
		top: 0;
	}

	.chatEntries {
		width: 300px;
		position: relative;
		left: -10px;
		top: -10px;
		height: 420px;
		flex-shrink: 0;
		padding: v.$spacing-def;
		padding-top: 56px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		overflow-y: scroll;
		overflow-x: hidden;
		background-color: c.$bg;
	}

	.chatPickerTop {
		top: 0;
		left: 0;
		width: inherit;
		box-sizing: border-box;
		flex-shrink: 0;
		background: linear-gradient(to bottom, #000000ff 50%, #00000000);
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		position: absolute;
		padding-bottom: v.$spacing-def;
		z-index: 21374;
	}
</style>
