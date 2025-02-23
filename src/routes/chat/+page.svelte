<script lang="ts">
	import Sidebar from '$lib/kit/layout/Sidebar.svelte';
	import View from '$lib/kit/layout/View.svelte';
	import Settings from '$lib/kit/layout/Settings.svelte';

</script>

<div class="main">
	<Settings></Settings>
	<Sidebar />
	<hr class="separator" />
	<View />
</div>
