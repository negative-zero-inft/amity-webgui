<script lang="ts">
	let { pfpLink = 'src/lib/amity.png', isOutline = false, size = 36 } = $props();
</script>

<img class="a{Number(isOutline)}" src={pfpLink} alt="pfp" style="--w: {size}px;"/>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.a1 {
		outline-width: 2px;
		outline: solid;
		outline-color: c.$clickable;
		outline-offset: -0.5px;
	}
	img {
		width: var(--w, v.$elem-height);
		height: var(--w, v.$elem-height);
		border-radius: 50%;
	}
</style>
