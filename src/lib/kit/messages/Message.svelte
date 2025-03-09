<script lang="ts">

	import SvelteMarkdown from 'svelte-markdown';
	import Icon from '../decor/Icon.svelte';

	let { 
		isSender = false, 
		isClustered = false, 
		content,
		type = "text"
	} = $props();
</script>

{#if type == "text"}
	<div  
		class="message {isSender ? 'sender' : 'foreign'} {isClustered ? 'clustered' : ''}"
	>
		<SvelteMarkdown source={content} />
	</div>
{:else}
	<div class="message {isSender ? 'sender' : 'foreign'} {isClustered ? 'clustered' : ''} unsupported">
		<Icon name="Warning"/> unsupported message
	</div>
{/if}

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

		&.unsupported{
			user-select: none;
			align-items: center; 
			display: flex; 
			gap: 10px;
			background-color: c.$dest-t10;
			border: solid;
			color: c.$text;
			border-color: c.$dest;
			border-width: 1px;
			box-sizing: border-box;
			background-image: repeating-linear-gradient(
				-45deg,
				transparent 15px,
				c.$dest-t25 15px,
				c.$dest-t25 35px,
				transparent 35px,
				transparent 55px /* added this so the pattern repeats seamlessly */
			);

			&:hover {
				background-color: c.$dest-t40;
				background-image: repeating-linear-gradient(
					-45deg,
					transparent 15px,
					c.$dest-t50 15px,
					c.$dest-t50 35px,
					transparent 35px,
					transparent 55px /* added this so the pattern repeats seamlessly */
				);
			}
		}
	}
</style>
