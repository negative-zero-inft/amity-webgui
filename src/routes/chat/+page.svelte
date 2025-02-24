<script lang="ts">
	import Sidebar from '$lib/kit/layout/Sidebar.svelte';
	import View from '$lib/kit/layout/View.svelte';
	import Settings from '$lib/kit/layout/Settings.svelte';
	import { user, server, isHttps, port } from '$lib/scripts/globalData';
	import { token } from '$lib/scripts/globalData';

	$effect(()=>{
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

<div class="main">
	<Settings></Settings>
	<Sidebar />
	<hr class="separator" />
	<View />
</div>
