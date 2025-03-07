<script lang="ts">
	import Icon from '$lib/kit/decor/Icon.svelte';

	let { 
		width = '200px', 
		icon = null, 
		placeholder = 'placeholder', 
		value = $bindable<string>(), 
		maxlength = 4000, 
		minlength = 0,
		isPassword = false, 
		onkeydown = ()=>{}, 
		style = "", 
		isError = false, 
		isImmutable = false, 
		bgc="none",
		height = "36px" 
	} = $props();

	let padding: number = $state<number>(10);

	if (icon) {
		padding = 36;
	}
</script>

<div class="wrapper" style="--w: {width}">
	{#if icon}
		<span class="icon {isError ? 'error' : ''}">
			<Icon name={icon} />
		</span>
	{/if}
	<input 
		minlength={minlength}
		readonly={isImmutable} 
		class="{isError ? 'error' : ''}" 
		onkeydown={(e)=>{onkeydown(e)}} 
		maxlength={maxlength} 
		bind:value 
		type={isPassword ? "password" : "text" } 
		{placeholder} 
		style="
			width: {width}; 
			height: {height}; 
			--icon: {icon}; 
			--padding: {padding}px; 
			{style}; 
			background-color: {bgc}
		"
	/>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	
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
		
		&.error{
			background-color: c.$accent-t10; 
			border-color: c.$accent !important; 
			background-image: repeating-linear-gradient(
				-45deg, 
				transparent 15px, 
				rgba(255, 0, 0, 0.25) 15px, 
				rgba(255, 0, 0, 0.25) 35px, 
				transparent 35px, 
				transparent 55px 
				);
			}
			
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
		
		&:-webkit-autofill,
		&:-webkit-autofill:focus, 
		&:-webkit-autofill:active{
			-webkit-box-shadow: 0 0 0 30px #540000 inset !important;
			border-color: c.$accent !important;
			border-width: 1px;
			-webkit-text-fill-color:white;
			caret-color: white;
		}
		
	}
	
	.wrapper {
		position: relative;
		width: var(--w);
		height: 36px;
		display: flex;
	}
	
	@keyframes shake {
		0% { transform: translateX(0); }
		25% { transform: translateX(-5px); }
		50% { transform: translateX(5px); }
		75% { transform: translateX(-5px); }
		100% { transform: translateX(0); }
	}

	.error{
		animation: shake 0.5s;
	}
	
	.icon {
		width: 16px;
		height: 16px !important;
		left: 10px;
		top: 10px;
		position: absolute;
		cursor: text;
		z-index: 1;
		background-color: none;
	}
</style>
