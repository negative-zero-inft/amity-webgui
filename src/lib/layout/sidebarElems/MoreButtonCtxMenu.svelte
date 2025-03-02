<script lang="ts">
	import Button from '$lib/kit/gizmos/Button.svelte';
	import Icon from '$lib/kit/Icon.svelte';
	import { isHttps, port, server, token, user } from '$lib/scripts/globalData';
	import {
		windowClickEvent,
		isMoreButtonCtxMenu,
		moreButtonClickEvent
	} from '$lib/scripts/chatViews';
	import Textbox from '$lib/kit/Textbox.svelte';
	import Label from '$lib/kit/Label.svelte';
	import Textarea from '$lib/kit/Textarea.svelte';
	import Switch from '$lib/kit/gizmos/Switch.svelte';
	import { getUser, iconList } from '$lib/scripts/requests';

	let {} = $props();

	let ctxMenu: HTMLElement | undefined = $state();
	let currentView: string = $state('default');
	let previousView: string = $state('default');
	let ctxDef: HTMLElement | undefined = $state();
	let ctxNew: HTMLElement | undefined = $state();
	let ctxNewGC: HTMLElement | undefined = $state();
	let ctxNewGCChannels: HTMLElement | undefined = $state();
	let ctxChannelMaker: HTMLElement | undefined = $state();
	let isGCPrivate: boolean = $state(false);
	let isGCChannels: boolean = $state(false);
	let gcName: string = $state('');
	let gcDesc: string = $state('');
	let isGCNameInvalid: boolean = $state(false);
	let channelType: "text" | "voice" = $state('text');
	let channels: {name: string, type: "text" | "voice", icon: string}[] = $state([]);
	let icon: string = $state('Cube');
	let channelName: string = $state('');
	let icons = iconList();
	let iconSearchQuery: string = $state("");
	let ctxIconPicker: HTMLElement | undefined = $state();
	const filteredIcons = () => {
		if (!iconSearchQuery) return icons;
		return icons.filter(icon => icon.toLowerCase().includes(iconSearchQuery.toLowerCase()));
	};
	
	isMoreButtonCtxMenu.subscribe(() => {});

	windowClickEvent.subscribe((e) => {
		if (
			e?.clientX < (ctxMenu?.offsetLeft as number) ||
			e?.clientX > (ctxMenu?.offsetLeft as number) + (ctxMenu?.offsetWidth as number) ||
			e?.clientY < (ctxMenu?.offsetTop as number) ||
			e?.clientY > (ctxMenu?.offsetTop as number) + (ctxMenu?.offsetHeight as number)
		) {
			if ($isMoreButtonCtxMenu) {
				currentView = 'default';
				previousView = 'default';
				$isMoreButtonCtxMenu = false;
				isGCPrivate = false;
				gcName = '';
				gcDesc = '';
				isGCChannels = false;
			}
		}
	});

	const createGC = async () => {
		if (gcName === ''){
			isGCNameInvalid = true;
			return;
		};
		try {
			const response = await fetch(
				`http${$isHttps ? 's' : ''}://${$server}:${$port}/group/create?token=${$token}`,
				{
					method: 'POST',
					body: JSON.stringify({
						name: gcName,
						description: gcDesc,
						is_public: !isGCPrivate,
						has_channels: isGCChannels
					}),
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					}
				}
			);
			console.log(response);
			getUser($isHttps, $server, $port, $token as string);
		} catch (e) {
			console.log(e);
		}
		currentView = 'default';
		previousView = 'default';
		$isMoreButtonCtxMenu = false;
		isGCPrivate = false;
		gcName = '';
		gcDesc = '';
		isGCChannels = false;
	};
</script>

<div
	bind:this={ctxMenu}
	id="ctxMenu"
	class="window"
	style="
		position: absolute;
		left: calc({$moreButtonClickEvent?.clientX}px - {currentView === 'newGC' || currentView === 'newGCChannels' || currentView === 'channelMaker' ? 160 : currentView === 'iconPicker' ? 150 : 120}px);
		scale: {$isMoreButtonCtxMenu ? 1 : 0};
		top: {$isMoreButtonCtxMenu ? 56 : -28}px;
		z-index: 12831928471983412381931723071;
		width: {currentView === 'newGC' || currentView === 'newGCChannels' || currentView === 'channelMaker' ? 320 : currentView === 'iconPicker' ? 300 : 240}px;
		height: {
			currentView === 'default' ? ctxDef?.clientHeight : 
			currentView === 'new' ? ctxNew?.clientHeight : 
			currentView === "newGC" && isGCChannels ? ctxNewGC?.clientHeight : 
			currentView === "newGC" ? ctxNewGC?.clientHeight : 
			currentView === "newGCChannels" ? ctxNewGCChannels?.clientHeight : 
			currentView === "channelMaker" ? ctxChannelMaker?.clientHeight : 
			currentView === "iconPicker" ? ctxIconPicker?.clientHeight : 
			ctxNewGC?.clientHeight
		}px; 
		padding: 0;
	">
	<!-- Default Context Menu View -->
	<div
		id="defaultCtxMenu"
		bind:this={ctxDef}
		class="defaultCtxMenuView"
		style="
        left: {currentView === 'default' ? 0 : -240}px;
        opacity: {currentView === 'default' ? 1 : previousView === 'default' ? 1 : 0};
    "
	>
		<Button
			action={() => {
				currentView = 'search';
			}}
			scaleClick={0.95}
			scaleHover={1.05}
			alignment="space-between"
			width="100%"
		>
			<div class="elem-horiz"><Icon name="Search"></Icon> Search Amity</div>
			<Icon name="Direction/Right"></Icon>
		</Button>
		<Button
			action={() => {
				currentView = 'new';
				previousView = 'default';
			}}
			scaleClick={0.95}
			scaleHover={1.05}
			alignment="space-between"
			width="100%"
		>
			<div class="elem-horiz"><Icon name="Plus"></Icon> Create...</div>
			<Icon name="Direction/Right"></Icon>
		</Button>
	</div>

	<!-- New Context Menu View -->
	<div
		id="newCtxMenu"
		class="defaultCtxMenuView"
		bind:this={ctxNew}
		style="
        left: {currentView === 'new' ? 0 : previousView === 'new' ? -240 : 240}px;
        opacity: {currentView === 'new' || previousView === 'new' || previousView === 'default'
			? 1
			: 0};
    "
	>
		<Button
			action={() => {
				currentView = 'newGC';
				previousView = 'new';
			}}
			scaleClick={0.95}
			scaleHover={1.05}
			width="100%"
			alignment="space-between"
		>
			<div class="elem-horiz"><Icon name="Users"></Icon> New group</div>
			<Icon name="Direction/Right"></Icon>
		</Button>
		<Button
			action={() => {
				currentView = 'newSB';
				previousView = 'new';
			}}
			scaleClick={0.95}
			scaleHover={1.05}
			width="100%"
			alignment="space-between"
		>
			<div class="elem-horiz"><Icon name="Announcement"></Icon> New soapbox</div>
			<Icon name="Direction/Right"></Icon>
		</Button>
		<Button
			action={() => {
				currentView = 'default';
				previousView = 'default';
			}}
			scaleClick={0.95}
			scaleHover={1.05}
			width="100%"
			alignment="left"><Icon name="X"></Icon> Cancel</Button
		>
	</div>

	<!-- New Group Context Menu View -->
	<div
		id="newGCCtxMenu"
		class="defaultCtxMenuView"
		bind:this={ctxNewGC}
		style="
        left: {currentView === 'newGC' ? 0 : previousView === 'newGC' ? -320 : currentView === 'newGCChannels' ? -320 : 240}px;
        opacity: {currentView === 'newGC' || previousView === 'newGC' || previousView === 'new'
			? 1
			: 0};
        width: 300px;
    "
	>
		<Label icon="Users" label="New group" />
		<Textbox 
			onkeydown={(e: KeyboardEvent) => {
				isGCNameInvalid = false;
				if (e.key === 'Enter') {
					createGC();
				}
			}}
			isError={isGCNameInvalid} 
			maxlength={32} 
			placeholder="Group name" 
			width="100%" 
			icon="Rename" 
			bind:value={gcName}>
		</Textbox>
		<Textarea placeholder="Group description" width="100%" height="72px" bind:value={gcDesc}
		></Textarea>
		<Button
			action={() => {
				isGCPrivate = !isGCPrivate;
			}}
			alignment="space-between"
			scaleClick={0.95}
			scaleHover={1.05}
			width="100%"
		>
			<div class="elem-horiz">
				<Icon name={isGCPrivate ? 'Lock/Locked' : 'Lock/Unlocked'}></Icon>
				Privacy
				<div style="opacity: 0.5;">{isGCPrivate ? 'Private' : 'Public'}</div>
			</div>
			<Switch isOn={isGCPrivate} />
		</Button>
		<Button
			action={() => {
				isGCChannels = !isGCChannels;
			}}
			alignment="space-between"
			scaleClick={0.95}
			scaleHover={1.05}
			width="100%"
		>
			<div class="elem-horiz">
				<Icon name="List"></Icon>
				Channels
				<div style="opacity: 0.5;">{isGCChannels ? 'Enabled' : 'Disabled'}</div>
			</div>
			<Switch isOn={isGCChannels} />
		</Button>
		{#if isGCChannels}
			<Button action={() => { 
				currentView = 'newGCChannels';
				previousView = 'newGC';
			 }} scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%">
				<div class="elem-horiz"><Icon name="List"></Icon> Channels <div style="opacity: 0.5">{channels.length} Channels</div></div>
				<Icon name="Direction/Right"></Icon>
			</Button>
		{/if}
		<div class="elements-horiz" style="gap: 10px; width: 100%;">
			<Button
				action={() => {
					currentView = 'new';
					previousView = 'new';
					isGCPrivate = false;
					gcName = '';
					gcDesc = '';
					isGCChannels = false;
					isGCPrivate = false;
				}}
				scaleClick={0.95}
				scaleHover={1.05}
				width="100%; flex-shrink: 1;"
			>
				<Icon name="X"></Icon> Cancel
			</Button>
			<Button
				style={1}
				action={createGC}
				scaleClick={0.95}
				scaleHover={1.05}
				width="100%; flex-shrink: 1;"
			>
				<Icon name="Plus"></Icon> Create group
			</Button>
		</div>
	</div>

	<!-- New Group Channels Context Menu View -->
	<div
		id="newGCChannelsCtxMenu"
		bind:this={ctxNewGCChannels}		
		class="defaultCtxMenuView"
		style="
        left: {currentView === 'newGCChannels' ? 0 : previousView === 'newGCChannels' ? -320 : 320}px;
        opacity: {currentView === 'newGCChannels' || previousView === 'newGCChannels' || previousView === 'newGC'
			? 1
			: 0};
        width: 320px;
	">
		<div class="channelPickerTop">
			<Button action={() => { 
				currentView = 'newGC';
				previousView = 'newGC';
			 }}><Icon name="Direction/Left"></Icon></Button>
			<Textbox bgc="black" width="100%" icon="Search" placeholder="Search channels..."></Textbox>
			<Button action={() => {
				currentView = 'channelMaker';
				previousView = 'newGCChannels';
			}}><Icon name="Plus"></Icon></Button>
		</div>
		<div id="allChats" class="chatEntries">
			{#if channels.length > 0}
				{#each channels as channel}
					<Button 
						alignment="space-between"
						width="100%" 
						scaleClick={0.95}
						scaleHover={1.05}
						action={() => {
						}}>
						<div class="elem-horiz">
							<Icon name={channel.icon}></Icon>
							<div>{channel.name}</div>
						</div>
						<Icon name="Direction/Right"></Icon>
					</Button>
				{/each}
			{:else}
				<div class="elem-horiz" style="width: 100%; justify-content: center;">No channels, press <Icon name="Plus"></Icon> to create one</div>
			{/if}
		</div>
	</div>	

	<!-- Channel Maker Context Menu View -->
	<div
		id="channelMakerCtxMenu"
		bind:this={ctxChannelMaker}
		class="defaultCtxMenuView"
		style="
			left: {currentView === 'channelMaker' ? 0 : previousView === 'channelMaker' ? -320 : 320}px;
			opacity: {currentView === 'channelMaker' || previousView === 'channelMaker' || previousView === 'newGCChannels'
				? 1
				: 0};
			width: 300px;
		"
	>
		<Label icon={icon} label="New channel" />
		<Textbox bind:value={channelName} width="100%" icon="Rename" placeholder="Channel name"></Textbox>
		<Button action={() => { 
			currentView = 'typePicker';
			previousView = 'channelMaker';
		 }} scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%">
			<div class="elem-horiz"><Icon name={channelType === 'text' ? 'Chat' : 'Phone'}></Icon> Channel type <div style="opacity: 0.5">{channelType}</div></div>
			<Icon name="Direction/Right"></Icon>
		</Button>
		<Button action={() => { 
			currentView = 'iconPicker';
			previousView = 'channelMaker';
		 }} scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%">
			<div class="elem-horiz"><Icon name={icon}></Icon> Icon <div style="opacity: 0.5">{icon}</div></div>
			<Icon name="Direction/Right"></Icon>
		</Button>
		<div class="elements-horiz" style="gap: 10px; width: 100%;">
			<Button 
				action={() => {
					currentView = 'newGCChannels';
					previousView = 'newGCChannels';
				}}
				width="100%; flex-shrink: 1;"
				scaleClick={0.95}
				scaleHover={1.05}
			><Icon name="X"></Icon> Cancel</Button>
			<Button 
				action={() => {
					channels.push({
						name: channelName,
						type: channelType,
						icon: icon
					})
					currentView = 'newGCChannels';
					previousView = 'newGCChannels';
				}}
				width="100%; flex-shrink: 1;"
				scaleClick={0.95}
				scaleHover={1.05}
				style={1}
			><Icon name="Plus"></Icon> Create channel</Button>
		</div>
	</div>

	<!-- Icon picker context menu view -->
	<div bind:this={ctxIconPicker} id="iconPickerCtxMenu" class="defaultCtxMenuView" style="
		left: {currentView === 'iconPicker' ? 0 : previousView === 'iconPicker' ? -320 : 320}px;
		opacity: {currentView === 'iconPicker' || previousView === 'iconPicker' || previousView === 'channelMaker'
			? 1
			: 0};
		width: 300px;
	">
		<div class="iconPickerTop">
			<Button action={() => { 
				currentView = 'channelMaker';
				previousView = 'channelMaker';
			 }}><Icon name="Direction/Left"></Icon></Button>
			<Textbox
				bgc="black"
				width="100%"
				icon="Search"
				placeholder="Search icons..."
				bind:value={iconSearchQuery}
			></Textbox>
		</div>
		<grid class="iconList">
			{#each filteredIcons() as child}
				<Button width="36px; height: 36px;" style={(icon == child.substring(14, child.length - 4)) ? 6 : 4} action={() => {
					icon = child.substring(14, child.length - 4);
					currentView = 'channelMaker';
					previousView = 'channelMaker';
				}}><Icon name={child.substring(14, child.length - 4)} /></Button>
			{/each}
		</grid>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	#newGCChannelsCtxMenu{
		height: 400px;
		padding: 0;
	}

	.iconList {
		width: 305px;
		height: 320px;
		padding: v.$spacing-def;
		padding-top: 56px;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(6, 36px);
		grid-template-rows: repeat(6, 36px);
		gap: 13px;
		overflow-y: scroll;
		overflow-x: hidden;
		background-color: c.$bg;
	}

	.iconPickerTop {
		top: 0;
		left: 0;
		width: 302px;
		box-sizing: border-box;
		flex-shrink: 0;
		background: linear-gradient(to bottom, #000000ff 50%, #00000000);
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		position: absolute;
		padding: v.$spacing-def;
		z-index: 21374;
	}

	#iconPickerCtxMenu {
		top: 0;
		width: 280px;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		position: absolute;
		transition: 0.25s;
		padding: 0;
	}

	.chatEntries {
		width: inherit;
		height: 400px;
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

	.channelPickerTop {
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
		padding: v.$spacing-def;
		z-index: 21374;
	}

	.elem-horiz {
		display: flex;
		gap: v.$spacing-def;
		align-items: center;
	}

	.defaultCtxMenuView {
		width: 220px;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		position: absolute;
		transition: left 0.25s;
		padding: v.$spacing-def;
	}
</style>
