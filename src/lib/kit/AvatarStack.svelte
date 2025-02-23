<script>
	import Avatar from './Avatar.svelte';

	let { avatar1 = 'amity.png', avatar2 = null, avatar3 = null } = $props();
</script>

<div class="avatars">
	<span class="avatar">
		<Avatar size={16} isOutline pfpLink={avatar1} />
	</span>
	{#if avatar2}
		<span class="avatar">
			<Avatar size={16} isOutline pfpLink={avatar2} />
		</span>
	{/if}
	{#if avatar3}
		<span class="avatar">
			<Avatar size={16} isOutline pfpLink={avatar3} />
		</span>
	{/if}
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.avatars {
		display: inline-flex;
		flex-direction: row-reverse;
		width: min-content;
		align-items: center;
		height: 16px;
	}

	.avatar {
		position: relative;
		border-radius: 50%;
		overflow: hidden;
		width: 60px;
		height: 16px;

		&:not(:last-child) {
			margin-left: -50px;
		}

		&:last-child {
			margin-left: -10px;
		}

		&:first-child {
			margin-right: -20px;
		}
	}
</style>
