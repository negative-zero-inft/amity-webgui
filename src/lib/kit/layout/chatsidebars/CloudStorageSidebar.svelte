<script lang="ts">
	import { isCloudStorageBar } from '$lib/scripts/chatViews';
	let animatedSidebar: number = $state(0);

	$effect(() => {
		if ($isCloudStorageBar) {
			animatedSidebar = 320;
		} else {
			animatedSidebar = 0;
		}
	});
</script>

<div class="bar" style="--w: {animatedSidebar}px">cloud storage</div>
{#if $isCloudStorageBar}
	<hr class="separator" />
{/if}

<style lang="scss">
	@use '$lib/style/variables.scss' as v;

	.bar {
		@include v.sidebar;
	}
</style>
