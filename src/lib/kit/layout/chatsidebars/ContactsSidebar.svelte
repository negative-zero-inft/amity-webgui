<script lang="ts">
	import { isContactsBar } from '$lib/scripts/chatViews';
	let animatedSidebar: number = $state(0);

	$effect(() => {
		if ($isContactsBar) {
			animatedSidebar = 320;
		} else {
			animatedSidebar = 0;
		}
	});
</script>

{#if $isContactsBar}
	<hr class="separator" />
{/if}
<div class="bar" style="--w: {animatedSidebar}px">Contacts</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;

	.bar {
		@include v.sidebar;
	}
</style>
