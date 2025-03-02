<script lang="ts">
	import Icon from '$lib/kit/decor/Icon.svelte';
	let { 
		icon = 'NegZero', 
		label = 'label',
		children = false,
		width = '100%'
	} = $props();

	let isOpen = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
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
{#if isOpen}
	<div class="children">
		{@render (children as any)?.()}
	</div>
{/if}

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.children{
		margin-top: 10px;
		min-width: 100%;
	}

	.fullLabel {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: v.$spacing-def;
	}

	.label {
		user-select: none;
		display: flex;
		align-items: center;
		padding-left: 5px;
		padding-right: 5px;
		gap: v.$spacing-def;
	}
</style>
