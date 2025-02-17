<script lang="ts">
	import { isChatInfo } from '$lib/scripts/chatViews';
	let animatedSidebar: number = $state(0); // sveltic runes

	// the $: is being deprecated.
	$effect(() => {
		if ($isChatInfo) {
			animatedSidebar = 320;
		} else {
			animatedSidebar = 0;
		}
	});
</script>

{#if $isChatInfo}
	<hr class="separator" />
{/if}
<div class="bar" style="--w: {animatedSidebar}px">chat info</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;

	.bar {
		@include v.sidebar;
	}
</style>
