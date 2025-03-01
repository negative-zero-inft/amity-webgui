<script lang="ts">
	import Avatar from '../Avatar.svelte';
	import Message from '../Message.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	let { isForeign = false, messages = [] } = $props();
</script>

<div class={isForeign ? 'clusterForeign' : 'clusterOwn'}>
	{#if isForeign}
		<Avatar></Avatar>
	{/if}
	<div class="clusterMessages" style={!isForeign ? 'align-items: flex-end' : ''}>
		{#each messages as message}
			<Message 
				isClustered={messages.findIndex((m) => m === message) >= 1} 
				isSender={!isForeign}
			>
				<SvelteMarkdown source={message} />
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
		gap: v.$spacing-msg;
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
