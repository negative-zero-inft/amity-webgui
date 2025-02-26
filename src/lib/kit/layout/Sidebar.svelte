<script lang="ts">
	import Userbar from './Userbar.svelte';

	import { setContext } from 'svelte';
	import { isUserBar } from '$lib/scripts/chatViews';
	import SidebarTop from './sidebarElems/SidebarTop.svelte';
	import ChatEntriesContainer from './sidebarElems/ChatEntriesContainer.svelte';

	setContext('isUserBar', isUserBar);
</script>

<Userbar />
<div
	class="sidebar"
	style="--u: {$isUserBar ? 0.9 : 1}; --o: {$isUserBar ? 0.25 : 1}; --r: {$isUserBar ? 1 : 0}"
>
	<SidebarTop />
	<hr class="separator" />
	<ChatEntriesContainer />
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.sidebar {
		height: 100%;
		min-width: 320px;
		width: 320px;
		max-width: 720px;
		display: flex;
		flex-direction: column;
		opacity: var(--o);
		scale: var(--u);
		transition: 0.25s;
		transform: rotate3d(0, var(--r), 0, 90deg);
		overflow: hidden;
		resize: horizontal;
	}
</style>
