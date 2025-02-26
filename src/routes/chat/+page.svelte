<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Sidebar from '$lib/kit/layout/Sidebar.svelte';
	import View from '$lib/kit/layout/View.svelte';
	import Settings from '$lib/kit/layout/Settings.svelte';
	import { user, server, isHttps, port } from '$lib/scripts/globalData';
	import { token } from '$lib/scripts/globalData';
	import { windowClickEvent } from '$lib/scripts/chatViews';
	import FolderCtxMenu from '$lib/kit/layout/sidebarElems/FolderCtxMenu.svelte';
	import Icon from '$lib/kit/Icon.svelte';

	$effect(() => {
		if (!browser) return;

		if (localStorage.getItem('isDev') == 'true') isHttps.set(false);

		const storedToken = localStorage.getItem('token');

		if (!storedToken) {
			goto('/login', { replaceState: true });
			return;
		}

		token.set(storedToken);

		if (localStorage.getItem('server')) {
			server.set(localStorage.getItem('server') || '');
		}

		getUser();
	});

	const getUser = async () => {
		try {
			const response = await fetch(
				`http${$isHttps ? 's' : ''}://${$server}:${$port}/user/me?token=${$token}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					}
				}
			);

			if (!response.ok) throw new Error('failed to fetch user');
			user.set(JSON.parse(await response.text()));
		} catch (e) {
			console.error(e);
			localStorage.removeItem('token');
			token.set(null);
			goto('/login', { replaceState: true });
		}
	};
</script>

{#if $token}
<FolderCtxMenu></FolderCtxMenu>
	<div
		class="main"
		onclick={(e) => {
			windowClickEvent.set(e);
		}}
	>
		<Settings />
		<Sidebar />
		<hr class="separator" />
		<View />
	</div>
{:else}
	<div class="main" style="
		display: flex;
		align-items: center;
		gap: 10px;
		justify-content: center;
		scale: 3;
		background: radial-gradient(#300000, #000000 30%);
	">
		<div id="loadingScreen">
			<Icon name="Update"></Icon>
		</div> Waking Amy up...
	</div>
{/if}

<style lang="scss">

	#loadingScreen{
		animation: spin 2s linear infinite; 
		width: 16px;
		height: 16px;
	}
	@keyframes spin {
		from {
			transform: rotateZ(0deg);
		}
		to {
			transform: rotateZ(360deg);
		}
	}
</style>