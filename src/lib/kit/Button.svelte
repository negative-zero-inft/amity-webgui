<script lang="ts">
	let {
		style = "default" as "default" | "accent" | "destructive" | "selected",
		isChip = false,
		width = 'min-content',
		alignment = "center",
		action = () => {},
		children,
		id = '',
		scaleHover = 1.1,
		scaleClick = 0.9,
		hoverAction = ()=>{},
		contextmenu=()=>{},
		tooltip = ""
	} = $props();

</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<button
	title={tooltip}
	oncontextmenu={(e)=>{contextmenu(e)}}
	{id}
	class="{style} {isChip ? 'chip' : ''}"
	style="--w: {width}; --a: {alignment}; --sh: {scaleHover}; --sc: {scaleClick}"
	onclick={(e) => {
		action(e);
	}}
	onmouseover={(e) =>{
		hoverAction(e)
	}}
>
	{@render children?.()}
</button>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;
	
	button {
		@include v.standard-text();
		padding: v.$spacing-def;
		height: v.$elem-height;
		gap: v.$spacing-def;
		user-select: none;
		white-space: nowrap;
		flex-direction: row !important;
		width: var(--w);
		justify-content: var(--a);
		transition: 0.25s;
		flex-shrink: 0;
		border-radius: v.$corner-elem;
		align-items: center;
		display: flex;
		border: none;
		box-sizing: border-box;

		&:hover {
			transform: scale(var(--sh));
			cursor: pointer;
		}
		&:active {
			transform: scale(var(--sc));
		}
	}
	
	.chip {
		height: v.$chip-height;
		padding: v.$spacing-chip;
	}

	.default {
		background-color: c.$clickable;
		color: c.$text;

		&:hover {
			background-color: c.$hover;
		}
	
		&:active {
			background-color: c.$clicked;
		}
	}

	.accent {
		background-color: c.$accent;
		color: c.$text;
		
		&:hover {
			background-color: c.$accent-t80;
		}
	
		&:active {
			background-color: c.$accent-t40;
		}
	}

	.selected {
		background-color: c.$accent-t50;
		border: solid;
		color: c.$text;
		border-color: c.$accent;
		border-width: 1px;

		&:hover {
			background-color: c.$accent-t80;
		}
		&:active {
			background-color: c.$accent;
		}
	}

	.destructive {
		background-color: c.$accent-t10;
		border: solid;
		color: c.$text;
		border-color: c.$accent;
		border-width: 1px;
		box-sizing: border-box;
		background-image: repeating-linear-gradient(
			-45deg,
			transparent 15px,
			rgba(255, 0, 0, 0.25) 15px,
			rgba(255, 0, 0, 0.25) 35px,
			transparent 35px,
			transparent 55px /* added this so the pattern repeats seamlessly */
		);

		&:hover {
			background-color: c.$accent-t40;
			background-image: repeating-linear-gradient(
				-45deg,
				transparent 15px,
				rgba(255, 0, 0, 0.5) 15px,
				rgba(255, 0, 0, 0.5) 35px,
				transparent 35px,
				transparent 55px /* added this so the pattern repeats seamlessly */
			);
		}
		&:active {
			background-color: c.$accent;
		}
	}
</style>
