<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { token, isHttps, server, port, accountIndex, authNumber, user } from '$lib/scripts/globalData';
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
	import ReLoginWindow from '$lib/layout/windows/ReLoginWindow.svelte';
	import NewGroupWindow from "$lib/layout/windows/NewGroupWindow.svelte";
	import NewFolderCtxMenu from '$lib/layout/windows/chat/NewFolderCtxMenu.svelte';
	
	const a = async () => {
		if (!browser) return;
		
		try{
			accountIndex.set(Number(page.url.searchParams.get("token")))
	
			const tokens: {token: string, server: string, isHttps: boolean, authNumber: number}[] = JSON.parse(localStorage.getItem('tokens') || "")
			const storedToken = tokens[$accountIndex];
	
			if (!storedToken) {
				clearLocalStorage()
				goto('/login', { replaceState: true });
				return;
			}
	
			isHttps.set(tokens[$accountIndex].isHttps)
			server.set(tokens[$accountIndex].server)
			
			const isReachable = await checkServerReachability(`http${$isHttps ? "s" : ""}://${$server}:${$port}`)
			if(isReachable){
				token.set(storedToken.token);
				authNumber.set(storedToken.authNumber)
			}else{
				console.log("fuck")
			}

			await getUser($isHttps, $server, $port, ($token as string))
			console.log($user)
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
		<ReLoginWindow/>
		<NewGroupWindow/>
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

<NewFolderCtxMenu/>
<FolderCtxMenu/>
<LingoWindow/>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

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