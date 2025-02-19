<script lang="ts">
	import Button from '$lib/kit/Button.svelte';
	import Slogan from '$lib/kit/Slogan.svelte';
	import '$lib/style/global.scss';
</script>

<div class="main">
	<Slogan />
	<Button>Coming soon</Button>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	:global(body) {
		background: black;
		background: radial-gradient(at right top, #4d0101, black);
	}
</style>
