<script>
	import Avatar from '$lib/kit/decor/Avatar.svelte';

	let {
		avatars = ['mascots/Amy.png', 'mascots/Dobby.png', 'mascots/Bill.png'],
		isHover = false,
		isActive = false
	} = $props();
</script>

<div
	class="avatars"
	style="
		width: {16 + (avatars.length - 1) * (16) + 1}px;
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

	@property --h {
		syntax: '<length-percentage>';
		initial-value: 0%;
		inherits: true;
	}
	@property --t {
		syntax: '<length-percentage>';
		initial-value: 0%;
		inherits: true;
	}

	.avatars {
		--s: 16px; /* image size*/
		--o: 2px; /* the overlap */
		--g: 2px; /* the gap */

		display: flex;
		gap: var(--g);
		clip-path: inset(0);
		min-height: var(--s);
		height: var(--s);
		max-height: var(--s);
	}
	.avatars .avatar {
		height: var(--s);
		aspect-ratio: 1;
		border-radius: 50%;
		border-block: var(--s) solid #0000;
		margin-block: calc(-1 * var(--s));
		translate: 0 var(--t);
	}
	.avatars .avatar:not(:last-child) {
		margin-right: calc(-1 * var(--o));
		mask: radial-gradient(
				50% 50% at calc(150% + var(--g) - var(--o)) calc(50% - var(--h)),
				#0000 calc(100% + var(--g)),
				#000 calc(101% + var(--g))
			)
			padding-box;
	}
</style>
