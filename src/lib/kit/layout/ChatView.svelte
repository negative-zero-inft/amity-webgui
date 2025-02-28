<script lang="ts">
	import Avatar from '$lib/kit/Avatar.svelte';
	import Message from '$lib/kit/Message.svelte';
	import Cluster from './Cluster.svelte';
</script>

<div class="chatView">
	<Cluster
		isForeign={true}
		messages={['WHAT DA WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 'skibidi toilet']}
	/>
	<Cluster messages={['skibidi toilet', 'moyay']} />
	<Cluster
		isForeign={true}
		messages={['WHAT DA WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 'skibidi toilet']}
	/>
	<Cluster messages={['skibidi toilet', 'moyay']} />
	<Cluster
		isForeign={true}
		messages={['WHAT DA WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 'skibidi toilet']}
	/>
	<Cluster messages={['skibidi toilet', 'moyay']} />
	<Cluster
		isForeign={true}
		messages={['WHAT DA WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 'skibidi toilet']}
	/>
	<Cluster messages={['skibidi toilet', 'moyay']} />
	<Cluster
		isForeign={true}
		messages={['WHAT DA WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 'skibidi toilet']}
	/>
	<Cluster messages={['skibidi toilet', 'moyay']} />
	<Cluster
		isForeign={true}
		messages={['WHAT DA WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 'skibidi toilet']}
	/>
	<Cluster messages={['skibidi toilet', 'moyay']} />
	<Cluster
		isForeign={true}
		messages={['WHAT DA WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 'skibidi toilet']}
	/>
	<Cluster messages={['skibidi toilet', 'moyay']} />
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
