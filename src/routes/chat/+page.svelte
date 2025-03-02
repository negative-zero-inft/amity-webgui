<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { token, isHttps, server, port } from '$lib/scripts/globalData';
	import { getUser } from '$lib/scripts/requests';
	import { currentChat, windowClickEvent } from '$lib/scripts/chatViews';
	import Icon from '$lib/kit/decor/Icon.svelte';
	import Sidebar from '$lib/layout/panels/MainSidebar.svelte';
	import Chatview from '$lib/layout/views/Chatview.svelte';
	import Emptyview from '$lib/layout/views/Emptyview.svelte';
	import LingoWindow from '$lib/layout/devTools/DevWindow.svelte';
	import ComboBox from '$lib/kit/gizmos/ComboBox.svelte';
	import { _ } from 'svelte-i18n';

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
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div 
		class="main"
		onclick={(e)=>{
			windowClickEvent.set(e)
		}}
	>
		<Sidebar/>
		<hr class="separator"/>
		{#if $currentChat.type == "empty"}
			<Emptyview/>
		{:else}
			<Chatview/>
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
			<Icon name="Update"/>
		</div> {$_("chat.loading")}
	</div>
{/if}

<LingoWindow/>

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