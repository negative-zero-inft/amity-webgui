<script lang="ts">
	import Sidebar from '$lib/kit/layout/Sidebar.svelte';
	import View from '$lib/kit/layout/View.svelte';
	import Settings from '$lib/kit/layout/Settings.svelte';
	import { user, server, isHttps, port } from '$lib/scripts/globalData';
	import { token } from '$lib/scripts/globalData';
	import { windowClickEvent } from '$lib/scripts/chatViews';

	$effect(()=>{
		if(localStorage.getItem("isDev") == "true") isHttps.set(false)
		if(!localStorage.getItem("token")) window.location.replace("/login")
		token.set(localStorage.getItem("token")) 
		if(localStorage.getItem("server")) server.set(localStorage.getItem("server") || "")
		console.log($server)
		getUser()
	})

	const getUser = async () =>{
		console.log($server)
		try{
			const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/user/me?token=${$token}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				}
			})
			user.set(JSON.parse(await response.text()))
		}catch(e){
			console.log(e)
			localStorage.removeItem("token")
			// window.location.replace("/login")
			token.set(null)
			return
		}
	}
	

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="main" onclick={(e)=>{
	windowClickEvent.set(e)
}}>
	<Settings></Settings>
	<Sidebar />
	<hr class="separator" />
	<View />
</div>
	