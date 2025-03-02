<script lang="ts">
	import Avatar from '$lib/kit/Avatar.svelte';
	import Message from '$lib/kit/Message.svelte';
	import { server, user } from '$lib/scripts/globalData';
	import Cluster from './Cluster.svelte';

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
					id: "2137420",
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

		],
	]
</script>

<div class="chatView">
	{#each messages || [] as cluster}
		<Cluster isForeign={!(cluster[0].id?.id != $user.id.id && cluster[0].id?.server == $user.id.server)} messages={cluster.slice(1).map((m: any) => m.content)}></Cluster>
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
