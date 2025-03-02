<script lang="ts">
	import { isPollBar } from '$lib/scripts/chatViews';
	let animatedSidebar: number = $state(0);

	$effect(() => {
		if ($isPollBar) {
			animatedSidebar = 320;
		} else {
			animatedSidebar = 0;
		}
	});
</script>

<div class="bar" style="--w: {animatedSidebar}px">poll</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;

	.bar {
		@include v.sidebar;
	}
</style>
