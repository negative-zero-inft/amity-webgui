<script lang="ts">
	import Avatar from './Avatar.svelte';

	let { isSender = false, isClustered = false, children } = $props();
</script>

<div class="message{Number(isSender)}{Number(isClustered)}">
	{@render children?.()}
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.fullMessage {
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
	}

	.message00 {
		background-color: c.$clickable;
		width: max-content;
		padding: v.$spacing-def;
		border-radius: 15px 15px 15px 5px;
		max-width: 600px;
		overflow-wrap: break-word;
	}
	.message00:hover {
		background-color: c.$hover;
	}
	.message01:hover {
		background-color: c.$hover;
	}

	.message10 {
		background-color: c.$accent-40;
		width: max-content;
		padding: v.$spacing-def;
		border-radius: 15px 15px 5px 15px;
		max-width: 600px;
		overflow-wrap: break-word;
	}

	.message01 {
		background-color: c.$clickable;
		width: max-content;
		padding: v.$spacing-def;
		border-radius: 5px 15px 15px 5px;
		max-width: 600px;
		overflow-wrap: break-word;
	}

	.message11 {
		background-color: c.$accent-40;
		width: max-content;
		padding: v.$spacing-def;
		border-radius: 15px 5px 5px 15px;
		max-width: 600px;
		overflow-wrap: break-word;
	}

	.message10:hover {
		background-color: c.$accent-80;
	}

	.message11:hover {
		background-color: c.$accent-80;
	}
</style>
