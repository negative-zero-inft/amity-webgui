<script lang="ts">

	let { isSender = false, isClustered = false, children } = $props();
</script>

<div class="message{Number(isSender)}{Number(isClustered)}">
	{@render children?.()}
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	@mixin message {
		max-width: 500px;
		overflow-wrap: break-word;
		width: max-content;
		padding: v.$spacing-def;
	}

	.fullMessage {
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
	}

	.message00 {
		background-color: c.$clickable;
		border-radius: 15px 15px 15px 5px;
		@include message;

		&:hover {
			background-color: c.$hover;
		}
	}

	.message10 {
		background-color: c.$accent-40;
		border-radius: 15px 15px 5px 15px;
		@include message;

		&:hover {
			background-color: c.$accent-80;
		}
	}

	.message01 {
		background-color: c.$clickable;
		border-radius: 5px 15px 15px 5px;
		@include message;

		&:hover {
			background-color: c.$hover;
		}
	}

	.message11 {
		background-color: c.$accent-40;
		border-radius: 15px 5px 5px 15px;
		@include message;

		&:hover {
			background-color: c.$accent-80;
		}
	}
</style>
