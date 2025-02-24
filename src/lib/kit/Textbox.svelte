<script lang="ts">
	import Icon from './Icon.svelte';

	let { width = '200px', icon = null, placeholder = 'placeholder', value = $bindable<string>(), maxlength = 4000, isPassword = false, onkeydown = ()=>{}, style = "", isError = false } = $props();

	let padding: number = $state<number>(10);

	if (icon) {
		padding = 36;
	}
</script>

<div class="wrapper" style="--w: {width}">
	{#if icon}
		<span class="icon">
			<Icon name={icon} />
		</span>
	{/if}
	<input class="e{Number(isError)}" onkeydown={(e)=>{onkeydown(e)}} maxlength={maxlength} bind:value type={isPassword ? "password" : "text" } {placeholder} style="--w: {width}; --icon: {icon}; --padding: {padding}px; {style}" />
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.e1{
		background-color: c.$accent-10; 
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

	input:-webkit-autofill,
	input:-webkit-autofill:focus, 
	input:-webkit-autofill:active{
		-webkit-box-shadow: 0 0 0 30px #540000 inset !important;
		border-color: c.$accent !important;
		border-width: 1px;
		-webkit-text-fill-color:white;
		caret-color: white;
	}


	input {
		display: flex;
		padding-left: calc(var(--padding) - 1px);
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
			padding-left: calc(var(--padding) - 5px);
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
			padding-left: calc(var(--padding) - 2px);
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
