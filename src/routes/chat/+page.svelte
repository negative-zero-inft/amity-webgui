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
	import LoginBox from "$lib/layout/windows/login/LoginBox.svelte";
	import SignupBox from "$lib/layout/windows/login/SignupBox.svelte";
	import AccountSwitcher from '$lib/layout/windows/login/AccountSwitcher.svelte';
	import { isError, errorValue, view } from "$lib/scripts/loginWritables";
	import { checkServerReachability } from "$lib/scripts/requests";

	const a = async () => {
		if (!browser) return;
		
		try{
			accountIndex.set(Number(page.url.searchParams.get("token")))
	
			const tokens: {token: string, server: string, isHttps: boolean}[] = JSON.parse(localStorage.getItem('tokens') || "")
			const storedToken = tokens[$accountIndex].token;
	
			if (!storedToken) {
				clearLocalStorage()
				goto('/login', { replaceState: true });
				return;
			}
	
			isHttps.set(tokens[$accountIndex].isHttps)
			server.set(tokens[$accountIndex].server)
			
			const isReachable = await checkServerReachability(`http${$isHttps ? "s" : ""}://${$server}:${$port}`)
			if(isReachable){
				token.set(storedToken);
			}else{
				isError.set(true);
			}

			getUser($isHttps, $server, $port, ($token as string))
		}catch(e){
			clearLocalStorage()
			token.set(null);
			goto('/login', { replaceState: true });
		}
	}
	$effect(()=>{
		a()
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
				transition: backdrop-filter 0.25s;
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
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div 
				onclick={()=>{isError.set(false)}} 
				style="
					transform: scale({$isError ? "1" : "0"}); 
					opacity: {$isError ? "1" : "0"};
				" 
				class="error"
			>
				<Icon name="Warning"></Icon>{$errorValue}
			</div>
			<div 
				class="window"
				style="
					scale: {$isReLogin ? 1 : 0};
					width: 340px;
					padding: 0;
					position: absolute;
					left: {$isReLogin ? "calc(50vw - 170px)" : (320 / 2) - 36 + "px"};
					top: {$isReLogin ?
						"calc(50vh - " + ($view == "login" ? loginHeight : $view == "accountList" ? switcherHeight : signupHeight) / 2 + "px)" : 
						(150 - 28) - ($view == "login" ? loginHeight : $view == "accountList" ? switcherHeight : signupHeight) / 2 + "px"
					};
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
	@use '$lib/style/variables.scss' as v;
	
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
	.error{
		overflow: hidden;
		position: absolute;
		bottom: 10px;
		transition: 0.25s;
		gap: v.$spacing-def;
		font-size: 16px;
		width: 320px;
		height: max-content;
		padding: 10px;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		background-color: c.$accent-t10;
		border-radius: v.$corner-window;
		border: solid;
		border-width: 1px;
		z-index: 2137;
		border-color: c.$accent;
		background-image: repeating-linear-gradient(
			-45deg,
			transparent 15px,
			rgba(255, 0, 0, 0.25) 15px,
			rgba(255, 0, 0, 0.25) 35px,
			transparent 35px,
			transparent 55px /* added this so the pattern repeats seamlessly */
		);
		&:hover{
			background-color: c.$accent-t40;
			scale: 1.1;
		}
		&:active{
			scale: 0.9;
			background-color: c.$accent-t80;
		}
	}
</style>