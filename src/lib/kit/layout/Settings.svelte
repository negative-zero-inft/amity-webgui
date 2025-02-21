<script lang="ts">
	import Button from '../Button.svelte';
	import { isSettings } from '$lib/scripts/chatViews';
	import Icon from '../Icon.svelte';
	import Textbox from '../Textbox.svelte';

</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
	class="bg" 
	style="
		// opacity: {$isSettings ? 1 : 0}; 
		pointer-events: {$isSettings ? "auto" : "none"};
		--blur: {$isSettings ? 80 : 0}px;
		background-color: {$isSettings ? "#00000040" : "#00000000" };
	"
	on:click={(e) =>{
		if(e.target === e.currentTarget){
			isSettings.set(false);
		}
	}}
>
	<div class="settingWindow" style="
		width: {$isSettings ? "1100px" : "300px"}; 
		height: {$isSettings ? "calc(100vh - 150px)" : "36px"};
		opacity: {$isSettings ? "1" : "0"};
		transform: {$isSettings ?  "translate(0, 0)" : "translate(calc(-50vw + 159px), calc(50vh - 28px))"};
	">
		<div class="sidebar">
			<div class="sidebarTop">
				<Button action={() => {isSettings.set(false);}}><Icon name="X"></Icon></Button>
				<Textbox placeholder="Search settings..." icon="Search" width="100%"></Textbox>
			</div>
			<hr class="separator"/>
			<div class="options">
				<div class="cluster">
					<Button style={2} scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
						><div class="elem-horiz"><Icon name="User"></Icon> Profile</div>
						<Icon name="Direction/Right"></Icon></Button
					>
					<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
						><div class="elem-horiz"><Icon name="Lock/Locked"></Icon> Security</div>
						<Icon name="Direction/Right"></Icon></Button
					>
				</div>
				<div class="cluster">
					<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
						><div class="elem-horiz"><Icon name="Paintbrush"></Icon> Customization</div>
						<Icon name="Direction/Right"></Icon></Button
					>
					<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
						><div class="elem-horiz"><Icon name="Folder/Default"></Icon> Folders</div>
						<Icon name="Direction/Right"></Icon></Button
					>
					<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
						><div class="elem-horiz"><Icon name="Translate"></Icon> Language</div>
						<Icon name="Direction/Right"></Icon></Button
					>
				</div>
				<div class="cluster">
					<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
						><div class="elem-horiz"><Icon name="Bell"></Icon> Notifications</div>
						<Icon name="Direction/Right"></Icon></Button
					>
					<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
						><div class="elem-horiz"><Icon name="HardDrive"></Icon> Data and storage</div>
						<Icon name="Direction/Right"></Icon></Button
					>
					<Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
						><div class="elem-horiz"><Icon name="Display"></Icon> Devices</div>
						<Icon name="Direction/Right"></Icon></Button
					>
				</div>
			</div>
		</div>
		<hr class="separator"/>
		<div class="settingsView">
			<div class="userTop">
				<img src="src/lib/Jump.png" class="banner" alt="banner" />

			</div>
		</div>
	</div>
</div>

<style lang="scss">

	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.banner {
		position: absolute;
		left: 321px;
		top: 0;
		width: 779px;
		height: 150px;
		z-index: -1;
		object-fit: cover;
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

	.sidebarTop{
		display: flex;
		gap: v.$spacing-def;
		padding: v.$spacing-def;
	}

	.sidebar{
		width: 320px;
		display: flex;
		flex-direction: column;
	}

	.settingWindow {
		background-color: c.$bg;
		border-radius: v.$corner-window;
		border: solid;
		border-color: c.$text-25;
		border-width: 1px;
		transition: 0.25s;
		display: flex;
		overflow: hidden;
	}

	.bg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 6969696969;
		background-color: c.$bg-25;
		backdrop-filter: blur(var(--blur));
		-webkit-backdrop-filter: blur(var(--blur));
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.25s;
	}
</style>
