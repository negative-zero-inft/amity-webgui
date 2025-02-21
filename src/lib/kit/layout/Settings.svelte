<script lang="ts">
	import Button from '../Button.svelte';
	import { isSettings } from '$lib/scripts/chatViews';
	import Icon from '../Icon.svelte';

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
		width: {$isSettings ? "calc(100vw - 700px)" : "300px"}; 
		height: {$isSettings ? "calc(100vh - 150px)" : "36px"};
		opacity: {$isSettings ? "1" : "0"};
		transform: {$isSettings ?  "translate(0, 0)" : "translate(calc(-50vw + 159px), calc(50vh - 28px))"};
	">
		<Button
			action={() => {
				isSettings.set(false);
			}}><Icon name="X"></Icon></Button
		>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;
	.settingWindow {
		padding: v.$spacing-def;
		background-color: c.$bg;
		border-radius: v.$corner-window;
		border: solid;
		border-color: c.$text-25;
		border-width: 1px;
		transition: 0.25s;
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
