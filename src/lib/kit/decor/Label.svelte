<script lang="ts">
	import Icon from '$lib/kit/decor/Icon.svelte';
	let { 
		icon = 'NegZero', 
		label = 'label',
		children = null as any,
		width = '100%',
		isOpen = false
	} = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="elem-vert" style="width: {width};">
	<div 
		class="fullLabel" 
		style="
			width: {width};
			cursor: {children ? 'pointer' : 'default'};
		"
		onclick={ () => isOpen = !isOpen }
	>
		<div class="label">
			<Icon name={icon}></Icon>
			{label}
		</div>
		{#if children}
			<span class="arrow" style="transform: rotate({isOpen ? '180deg' : '0deg'}); transition: transform 0.25s;">
				<Icon name="Direction/Down"></Icon>
			</span>
		{/if}
	</div>

	{#if isOpen && children}
		<div class="children">
			{@render (children as any)?.()}
		</div>
	{/if}
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.children{
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		min-width: 100%;
	}

	.fullLabel {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		gap: v.$spacing-def;
		padding-left: v.$spacing-def;
		padding-right: v.$spacing-def;
	}

	.label {
		user-select: none;
		display: flex;
		align-items: center;
		gap: v.$spacing-def;
	}
</style>
