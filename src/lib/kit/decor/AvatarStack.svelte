<script>
	import Avatar from './Avatar.svelte';

	let { 
		avatars = [ "amity.png", "guitar.png", "Jump.png" ],
		isHover = false,
		isActive = false
	} = $props();
</script>

<div 
	class="avatars"
	style="
		width: {16 + (avatars.length - 1) * (16 - 2)}px;
	"
>
	{#each avatars as avatar}
		<span 
			class="
				avatar
				{isHover ? 'hover' : ''} 
				{isActive ? 'active' : ''}
				{avatars.indexOf(avatar) === 0 ? 'first' : ''}
			"
			style="
				--i: {avatars.indexOf(avatar)}
			"
		>
			<Avatar size={16} pfpLink={avatar} />
		</span>
	{/each}
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
		flex-shrink: 0;
		width: 16px;
		height: 16px;
		position: relative;
		border-radius: 50%;
		overflow: hidden;
		height: 16px;
		left: calc(var(--i) * 2px);
		outline-width: 2px;
		outline: solid;
		outline-color: c.$clickable;
		outline-offset: -0.5px;

		&.hover {
			outline-color: c.$hover;
		}
		
		&.active {
			outline-color: c.$clicked;
		}
		transition: 0.25s;
	}
</style>
