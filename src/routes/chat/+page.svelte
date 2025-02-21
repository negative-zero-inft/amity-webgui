<script lang="ts">
	import '$lib/style/global.scss';
	import Sidebar from '$lib/kit/layout/Sidebar.svelte';
	import View from '$lib/kit/layout/View.svelte';
	import Settings from '$lib/kit/layout/Settings.svelte';

	import { isSettings } from "$lib/scripts/chatViews";
</script>

<div class="main">
	{#if $isSettings}
		<Settings></Settings>
	{/if}
	<Sidebar />
	<hr class="separator" />
	<View />
</div>
