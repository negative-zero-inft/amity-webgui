<script lang="ts">
	import Avatar from '$lib/kit/decor/Avatar.svelte';
	import Message from '$lib/kit/messages/Message.svelte';
	import { isHttps, port, token, user } from '$lib/scripts/globalData';

	let { 
		author = {
			id: "", 
			server: ""
		}, 
		messages = [], 
		isGroup = false 
	} = $props();

	let authorInfo = $state({
		name: "",
		avatar: "",
		banner: ""
	})

	let isForeign:boolean = author.id != $user?.id.id

	$effect(() => {
		getAuthor()
	})

	export const getAuthor = async () =>{
		if(!author.server) return
		if(!author.id) return
		try{
			const response = await fetch(`http${$isHttps ? "s" : ""}://${author.server}:${$port}/user/${author.id}/info?token=${$token}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				}
			})
			authorInfo = JSON.parse(await response.text())
		}catch(e){
			throw e
		}
	}
</script>

<div class={isForeign ? 'clusterForeign' : 'clusterOwn'}>
	{#if isForeign && isGroup}
		<Avatar pfpLink={authorInfo.avatar}></Avatar>
	{/if}
	<div class="clusterMessages" style={!isForeign ? 'align-items: flex-end' : ''}>
		{#each messages as message}
			<Message 
				isClustered={messages.findIndex((m) => m === message) >= 1} 
				isSender={!isForeign}
				content={message.content}
				type={message.type}
			>
			</Message>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.clusterMessages {
		display: flex;
		flex-direction: column;
		gap: v.$spacing-msg;
	}

	.clusterForeign {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: v.$spacing-def;
		align-items: flex-end;
	}

	.clusterOwn {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: flex-end;
		gap: v.$spacing-msg;
	}
</style>
