<script lang="ts">
	let {
		action = () => {},
		id = '',
		command = "test",
		img = "src/lib/amity.png"
	} = $props();
</script>

<button
	{id}
	class="cmd"
	onclick={(e) => {
		action(e);
	}}><img alt="command" src={img}/>{command}</button
>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	img{
		width: 36px;
		height: 36px;
	}
	button {
		white-space: nowrap;
		flex-direction: row !important;
		width: 100%;
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
	}

	.cmd:hover {
		background-color: c.$hover;
	}

	.cmd:active {
		background-color: c.$clicked;
	}
</style>
