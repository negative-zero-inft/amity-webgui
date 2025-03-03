<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { token, isHttps, server, port, accountIndex } from '$lib/scripts/globalData';
	import { getUser } from '$lib/scripts/requests';
	import { currentChat, windowClickEvent, isReLogin } from '$lib/scripts/chatViews';
	import Icon from '$lib/kit/decor/Icon.svelte';
	import Sidebar from '$lib/layout/panels/MainSidebar.svelte';
	import Chatview from '$lib/layout/views/Chatview.svelte';
	import Emptyview from '$lib/layout/views/Emptyview.svelte';
	import FolderCtxMenu from '$lib/layout/windows/chat/FolderCtxMenu.svelte';
	import LingoWindow from '$lib/layout/devTools/DevWindow.svelte';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/state';
    import { view } from "$lib/scripts/loginWritables";
	import LoginBox from "$lib/layout/windows/login/LoginBox.svelte";
	import SignupBox from "$lib/layout/windows/login/SignupBox.svelte";
	import AccountSwitcher from '$lib/layout/windows/login/AccountSwitcher.svelte';

	$effect(() => {
		if (!browser) return;
		
		try{
			accountIndex.set(Number(page.url.searchParams.get("token")))
			
			if (localStorage.getItem('isDev') == 'true') isHttps.set(false);
	
			const tokens: {token: string, server: string}[] = JSON.parse(localStorage.getItem('tokens') || "")
			const storedToken = tokens[$accountIndex].token;
	
			if (!storedToken) {
				clearLocalStorage()
				goto('/login', { replaceState: true });
				return;
			}
	
			token.set(storedToken);
	
			if (localStorage.getItem('server')) {
				server.set(localStorage.getItem('server') || '');
			}
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

	let signupHeight: number = $state(0)
    let loginHeight: number = $state(0)
	let switcherHeight: number = $state(0)

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
		<div 
			id="hhhh"
			class="blurredReloginBg"
			style="
				backdrop-filter: blur({$isReLogin ? 80 : 0}px);
				pointer-events: {$isReLogin ? "auto" : "none"};
				background-color: #{$isReLogin ? "00000040" : "00000000"};
				transition: 0.25s;
			"
			onclick={(e: MouseEvent)=>{
				if(JSON.parse(localStorage.getItem("tokens") || "").length == 0){
					window.location.replace("/login")
				}
				if((e.target as HTMLElement).id == "hhhh"){
					isReLogin.set(false);
					view.set('accountList');
				}
			}}
		>
			<div 
				class="window"
				style="
					scale: {$isReLogin ? 1 : 0};
					width: 340px;
					padding: 0;
					height: {$view == "login" ? loginHeight : $view == "accountList" ? switcherHeight : signupHeight}px;
				"
			>
				<AccountSwitcher bind:height={switcherHeight}/>
				<LoginBox bind:height={loginHeight}/>
				<SignupBox bind:height={signupHeight}/>
			</div>
		</div>
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

<FolderCtxMenu/>
<LingoWindow/>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	
	.blurredReloginBg{
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 2137198237198237198371293871239817239817239817389217;
	}

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