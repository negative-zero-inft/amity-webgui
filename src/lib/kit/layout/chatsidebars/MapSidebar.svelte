<script lang="ts">
	import { isMapBar } from '$lib/scripts/chatViews';
	let animatedSidebar: number = $state(0);

	$effect(() => {
		if ($isMapBar) {
			animatedSidebar = 320;
		} else {
			animatedSidebar = 0;
		}
	});
</script>

{#if $isMapBar}
	<hr class="separator" />
{/if}
<div class="bar" style="--w: {animatedSidebar}px">map</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;

	.bar {
		@include v.sidebar;
	}
</style>
