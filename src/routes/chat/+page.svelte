<script lang="ts">
	import Sidebar from '$lib/kit/layout/Sidebar.svelte';
	import View from '$lib/kit/layout/View.svelte';
	import Settings from '$lib/kit/layout/Settings.svelte';
	import { user, server } from '$lib/scripts/globalData';
	import { token } from '$lib/scripts/globalData';

	$effect(()=>{
		if(!localStorage.getItem("token")) window.location.replace("/login")
		token.set(localStorage.getItem("token")) 
		getUser()
	})

	const getUser = async () =>{
		const response = await fetch(`http://${$server}/user/me?token=${$token}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		})
		if(response.status != 200){
			localStorage.removeItem("token")
			window.location.replace("/login")
			token.set(null)
			return
		}
		user.set(JSON.parse(await response.text()))
		console.log($user)
	}
	

</script>

<div class="main">
	<Settings></Settings>
	<Sidebar />
	<hr class="separator" />
	<View />
</div>
