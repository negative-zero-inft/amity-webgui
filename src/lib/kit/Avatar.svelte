<script lang="ts">
	let { pfpLink = 'amity.png', isOutline = false, size = 36 } = $props();
</script>

<img class={isOutline ? 'a1' : ''} src={pfpLink} alt="pfp" style="--w: {size}px;" />

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.a1 {
		outline-width: 2px;
		outline: solid;
		outline-color: c.$clickable;
		outline-offset: -0.5px;

		&:hover {
			outline-color: c.$hover;
		}

		&:active {
			outline-color: c.$clicked;
		}
	}

	img {
		width: var(--w, v.$elem-height);
		height: var(--w, v.$elem-height);
		border-radius: 50%;
	}
</style>
