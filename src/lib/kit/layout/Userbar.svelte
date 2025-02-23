<script lang="ts">
	import Button from '../Button.svelte';
	import Icon from '../Icon.svelte';
	import UserbarTop from './sidebarElems/UserbarTop.svelte';
	import { isSettings } from '$lib/scripts/chatViews';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let isExpanded = getContext<Writable<boolean>>('isUserBar');
</script>

<div class="bar" style="--w: {$isExpanded ? 320 : 0}px">
	<UserbarTop notifCount={0} />
	<hr class="separator" />
	<div class="options">
		<div class="cluster">
			<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
				><div class="elem-horiz"><Icon name="User"></Icon> Your profile</div>
				<Icon name="Direction/Right"></Icon></Button
			>
			<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
				><div class="elem-horiz"><Icon name="Users"></Icon> Your friends</div>
				<Icon name="Direction/Right"></Icon></Button
			>
			<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
				><div class="elem-horiz"><Icon name="Library"></Icon> Your things</div>
				<Icon name="Direction/Right"></Icon></Button
			>
		</div>
		<div class="cluster">
			<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
				><div class="elem-horiz"><Icon name="Bookmark"></Icon> Saved messages</div>
				<Icon name="Direction/Right"></Icon></Button
			>
			<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
				><div class="elem-horiz"><Icon name="Archive"></Icon> Archived chats</div>
				<Icon name="Direction/Right"></Icon></Button
			>
		</div>
		<div class="cluster">
			<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
				><div class="elem-horiz"><Icon name="Cloud"></Icon> About instance</div>
				<Icon name="Direction/Right"></Icon></Button
			>
			<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
				><div class="elem-horiz"><Icon name="List"></Icon> Amity changelog</div>
				<Icon name="Direction/Right"></Icon></Button
			>
			<Button
				action={()=>{
					localStorage.removeItem("token")
					window.location.replace("/login")
				}}
				style={3}
				scaleClick={0.95}
				scaleHover={1.05}
				alignment="flex-start"
				width="100%"><Icon name="Exit"></Icon> Log out</Button
			>
		</div>
	</div>
	<div class="bottomDock">
		<hr class="separator" />
		<div style="padding: 10px;">
			<Button
				action={() => {
					isSettings.set(true);
				}}
				scaleClick={0.95}
				scaleHover={1.05}
				alignment="flex-start"
				width="100%"><Icon name="Settings"></Icon> Settings</Button
			>
		</div>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.bottomDock {
		position: absolute;
		bottom: 0;
		height: 57px;
		width: 320px;
		display: flex;
		flex-direction: column;
		background-color: c.$bg;
	}
	.elem-horiz {
		display: flex;
		gap: v.$spacing-def;
		align-items: center;
	}

	.options {
		width: 320px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-top: v.$spacing-def;
		padding-bottom: v.$spacing-def;
		overflow-y: auto;
		overflow-x: hidden;
		flex-grow: 1;
	}
	.cluster {
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		padding-right: v.$spacing-def;
		padding-left: v.$spacing-def;
		overflow: visible;
	}

	.bar {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		z-index: 2137420;
		background-color: c.$bg;
		display: flex;
		flex-direction: column;
		@include v.sidebar();
	}
</style>
