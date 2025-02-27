<script lang="ts">
	import Icon from './Icon.svelte';

	let { 
		width = '200px', 
		placeholder = 'placeholder', 
		value = $bindable<string>(), 
		maxlength = 4000, 
		onkeydown = ()=>{}, 
		style = "", 
		isError = false, 
		isImmutable = false, 
		bgc="none",
		height = "36px",
        resize = "none"
	} = $props();

	let padding: number = $state<number>(10);
</script>


<textarea 
    readonly={isImmutable} 
    class="e{Number(isError)}" 
    onkeydown={(e)=>{onkeydown(e)}} 
    maxlength={maxlength} 
    bind:value 
    {placeholder} 
    style="
        width: {width}; 
        height: {height}; 
        --padding: 10px; 
        {style}; 
        background-color: {bgc};
		resize: {resize};
    " 
></textarea>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.e1{
		background-color: c.$accent-t10; 
		border-color: c.$accent; 
		background-image: repeating-linear-gradient(
			-45deg, 
			transparent 15px, 
			rgba(255, 0, 0, 0.25) 15px, 
			rgba(255, 0, 0, 0.25) 35px, 
			transparent 35px, 
			transparent 55px 
		);
	}

	.icon {
		width: 16px;
		height: 16px !important;
		left: 10px;
		top: 10px;
		position: absolute;
		cursor: text;
	}

	textarea {
		display: flex;
		padding: calc(var(--padding) - 1px);
		justify-content: center;
		align-content: center;
		gap: v.$spacing-def;
		border: solid;
		border-color: c.$text-25;
		border-width: 1px;
		border-radius: v.$corner-elem;
		color: c.$text;
		height: v.$elem-height;
		width: var(--w);
		background: none;
		box-sizing: border-box;
		@include v.standard-text();
		transition: 0.25s;

		&:hover {
			padding: calc(var(--padding) - 5px);
			border-width: 5px;
		}
		&:active {
			transition: 0.1s;
			border-width: 1px;
		}

		&:focus {
			border: solid;
			border-width: 2px;
			border-color: c.$text-50;
			padding: calc(var(--padding) - 2px);
			outline: none;
		}
	}

	.wrapper {
		position: relative;
		width: var(--w);
		height: 36px;
		display: flex;
	}
</style>
