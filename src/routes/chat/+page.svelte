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
	import MoreButtonCtxMenu from '$lib/kit/layout/sidebarElems/MoreButtonCtxMenu.svelte';
	import { getUser } from '$lib/scripts/requests';
	import { currentChat } from '$lib/scripts/chatViews';	

	currentChat.subscribe((value) => {
		console.log(value)
	})

	$effect(() => {
		if (!browser) return;
		
		if (localStorage.getItem('isDev') == 'true') isHttps.set(false);

		const storedToken = localStorage.getItem('token');

		if (!storedToken) {
			clearLocalStorage()
			goto('/login', { replaceState: true });
			return;
		}

		token.set(storedToken);

		if (localStorage.getItem('server')) {
			server.set(localStorage.getItem('server') || '');
		}

		try{
			getUser($isHttps, $server, $port, ($token as string))
		}catch(e){
			clearLocalStorage()
			token.set(null);
			goto('/login', { replaceState: true });
		}
	});

	const clearLocalStorage = ()=>{
		localStorage.removeItem('token');
		localStorage.removeItem('server');
		localStorage.removeItem('isDev');
	}
</script>

{#if $token}
	<FolderCtxMenu></FolderCtxMenu>
	<MoreButtonCtxMenu></MoreButtonCtxMenu>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="main"
		onclick={(e) => {
			windowClickEvent.set(e);
		}}
	>
		<Settings />
		<Sidebar />
		<hr class="separator" />
		{#if $currentChat.id.id.length > 0}
			<View />
		{:else}
			<div class="noChatSelected">
				Select a chat
			</div>
		{/if}
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
	@use '$lib/style/colors.scss' as c;

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

	.noChatSelected{
		font-size: 24px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
</style>