<script lang="ts">
	let {
		action = () => {},
		id = '',
		command = "test",
		img = "src/lib/amity.png",
		width = "100%"
	} = $props();
</script>

<button
	{id}
	class="cmd"
	style="width: {width};"
	onclick={(e) => {
		action(e);
	}}><img alt="command" src={img}/>{command}</button>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	img{
		width: v.$elem-height;
		height: v.$elem-height;
	}
	button {
		white-space: nowrap;
		flex-direction: row !important;
		justify-content: flex-start;
		transition: 0.25s;
	}
	button:hover {
		transform: scale(1.1);
	}
	button:active {
		transform: scale(0.9);
	}
	
	.cmd {
		flex-shrink: 0;
		background-color: c.$clickable;
		color: c.$text;
		border-radius: v.$corner-elem;
		height: v.$elem-height;
		border: none;
		display: flex;
		align-items: center;
		gap: v.$spacing-def;
		padding: 0px;
		padding-right: v.$spacing-def;
		@include v.standard-text();
		overflow: hidden;
	}

	.cmd:hover {
		background-color: c.$hover;
	}

	.cmd:active {
		background-color: c.$clicked;
	}
</style>
