<script lang="ts">

	import SvelteMarkdown from 'svelte-markdown';

	let { 
		isSender = false, 
		isClustered = false, 
		content 
	} = $props();
</script>

<div  
	class="message {isSender ? 'sender' : 'foreign'} {isClustered ? 'clustered' : ''}"
>
	<SvelteMarkdown source={content} />
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.message {
		max-width: 500px;
		overflow-wrap: break-word;
		width: max-content;
		padding: v.$spacing-def;
		transition: 0.25s;

		&.sender{
			background-color: c.$accent-t40;
			border-radius: 15px 15px 5px 15px;
			&.clustered{
				border-radius: 15px 5px 5px 15px;
			}

			&:hover{
				background-color: c.$accent-t80;
			}
		}

		&.foreign{
			background-color: c.$clickable;
			border-radius: 15px 15px 15px 5px;

			&.clustered{
				border-radius: 5px 15px 15px 5px;
			}

			&:hover{
				background-color: c.$hover;
			}
		}
	}
</style>
