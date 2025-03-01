<script lang="ts">
	import Avatar from '$lib/kit/Avatar.svelte';
	import Message from '$lib/kit/Message.svelte';
	import Cluster from './Cluster.svelte';

	const mdExample = "# Welcome to My Markdown Playground! 🎨\n\nHey there! This is a *fun* example of mixing **Markdown** and <em>HTML</em> together.\n\n## Things I Love:\n1. Writing in <strong>bold</strong> and _italic_\n2. Making lists (like this one!)\n3. Using emojis 🚀 ✨ 🌈\n\n# help, they're keeping me here \n| Feature | Markdown | HTML |\n|---------|:--------:|-----:|\n| Bold | **text** | <strong>text</strong> |\n| Italic | *text* | <em>text</em> |\n| Links | [text](url) | <a href=\"url\">text</a> |\n\nHere's a quote for you:\n\n> \"The best of both worlds\" - <cite>Someone who loves markdown & HTML</cite>\n\nYou can even use <sup>superscript</sup> and <sub>subscript</sub> text!\n\n---\n\n<details>\n<summary>Want to see something cool?</summary>\nHere's a hidden surprise! 🎉\n</details>\n\nHappy coding! <span style=\"color: hotpink\">♥</span>";
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
		messages={['WHAT DA WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', '# skibidi toilet']}
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
		messages={['WHAT DA WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', 'skibidi toilet', mdExample]}
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
