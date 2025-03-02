<script lang="ts">
	import Avatar from '$lib/kit/decor/Avatar.svelte';
	import Message from '$lib/kit/messages/Message.svelte';
	import { server, user } from '$lib/scripts/globalData';
	import { currentChat } from '$lib/scripts/chatViews';
	import Cluster from '../kit/messages/MsgCluster.svelte';

	const messages = [
		[
			{
				id: {
					id: $user.id.id,
					server: $user.id.server
				}
			},
			{
				date: new Date(),
				content: "testoid 2"
			},
			{
				date: new Date(),
				content: "testoid"
			},

		],
		[
			{
				id: {
					id: "ZSTXMJ16VQ2OG2AIQF49YZZ8",
					server: $server
				}
			},
			{
				date: new Date(),
				content: "testoid 2"
			},
			{
				date: new Date(),
				content: "testoid"
			},
			{
				date: new Date(),
				content: "testoid"
			},
			{
				date: new Date(),
				content: "# testoid"
			}
		],
	]
</script>

<div class="chatView">
	{#each messages || [] as cluster}
		<Cluster 
			isGroup={$currentChat.type == "group" || $currentChat.type == "monogroup"} 
			author={cluster[0].id}
			messages={cluster.slice(1).map((m: any) => m.content)}>
		</Cluster>
	{/each}
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.chatView {
		width: 100%;
		overflow-y: scroll;
		display: flex;
		flex-direction: column-reverse;
		padding: v.$spacing-def;
		gap: v.$spacing-def;
		box-sizing: border-box;
		padding-top: 10px;
		height: 100%;
	}
</style>
