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
	.bar {
		transition: 0.25s ease 0s;
		width: var(--w);
		height: 100%;
		overflow: hidden;
		flex-shrink: 0;
	}
</style>
