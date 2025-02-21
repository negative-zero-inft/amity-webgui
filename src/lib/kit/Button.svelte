<script lang="ts">
	let {
		style = 0,
		/*
        0 = default
        1 = accent default
        2 = selected
        3 = destructive
        4 = chip
        5 = accent chip
        6 = selected chip
        */
		width = 'min-content',
		alignment = "center",
		action = () => {},
		children,
		id = '',
		scaleHover = 1.1,
		scaleClick = 0.9
	} = $props();
</script>

<button
	{id}
	class="bv{style}"
	style="--w: {width}; --a: {alignment}; --sh: {scaleHover}; --sc: {scaleClick}"
	onclick={(e) => {
		action(e);
	}}>{@render children?.()}</button
>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	button {
		white-space: nowrap;
		flex-direction: row !important;
		width: var(--w);
		justify-content: var(--a);
		transition: 0.25s;
		flex-shrink: 0;
	}
	button:hover {
		transform: scale(var(--sh));
	}
	button:active {
		transform: scale(var(--sc));
	}

	.bv2 {
		background-color: c.$accent-50;
		border: solid;
		color: c.$text;
		border-color: c.$accent;
		border-width: 1px;
		border-radius: v.$corner-elem;
		padding: v.$spacing-def;
		padding-left: 9px;
		padding-right: 9px;
		box-sizing: border-box;
		height: v.$elem-height;
		display: flex;
		align-items: center;
		flex-direction: row;
		gap: v.$spacing-def;
		@include v.standard-text();
	}
	.bv2:hover {
		background-color: c.$accent-80;
	}
	.bv2:active {
		background-color: c.$accent;
	}
	.bv6 {
		background-color: c.$accent-50;
		border: solid;
		color: c.$text;
		border-color: c.$accent;
		border-width: 1px;
		border-radius: v.$corner-elem;
		padding: v.$spacing-chip;
		padding-left: 7px;
		padding-right: 7px;
		box-sizing: border-box;
		height: v.$chip-height;
		display: flex;
		align-items: center;
		flex-direction: row;
		gap: v.$spacing-def;
		@include v.standard-text();
	}
	.bv6:hover {
		background-color: c.$accent-80;
	}
	.bv6:active {
		background-color: c.$accent;
	}

	.bv5 {
		background-color: c.$accent;
		color: c.$text;
		border-radius: v.$corner-elem;
		height: v.$chip-height;
		border: none;
		display: flex;
		align-items: center;
		gap: v.$spacing-def;
		padding: v.$spacing-chip;
		@include v.standard-text();
	}

	.bv5:hover {
		background-color: c.$accent-80;
	}

	.bv5:active {
		background-color: c.$accent-40;
	}

	.bv1 {
		background-color: c.$accent;
		color: c.$text;
		border-radius: v.$corner-elem;
		height: v.$elem-height;
		border: none;
		display: flex;
		align-items: center;
		gap: v.$spacing-def;
		padding: v.$spacing-def;
		@include v.standard-text();
	}

	.bv1:hover {
		background-color: c.$accent-80;
	}

	.bv1:active {
		background-color: c.$accent-40;
	}

	.bv0 {
		background-color: c.$clickable;
		color: c.$text;
		border-radius: v.$corner-elem;
		height: v.$elem-height;
		border: none;
		display: flex;
		align-items: center;
		gap: v.$spacing-def;
		padding: v.$spacing-def;
		@include v.standard-text();
	}

	.bv0:hover {
		background-color: c.$hover;
	}

	.bv0:active {
		background-color: c.$clicked;
	}

	.bv4 {
		background-color: c.$clickable;
		color: c.$text;
		border-radius: v.$corner-elem;
		height: v.$chip-height;
		border: none;
		display: flex;
		align-items: center;
		gap: v.$spacing-def;
		padding: v.$spacing-chip;
		@include v.standard-text();
	}

	.bv4:hover {
		background-color: c.$hover;
	}

	.bv4:active {
		background-color: c.$clicked;
	}
</style>
