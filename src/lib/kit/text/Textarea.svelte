<script lang="ts">
	import Icon from '$lib/kit/decor/Icon.svelte';

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
        resize = "none",
		icon = "",
		zIndex = 0
	} = $props();

	let padding: number = $derived(icon.length > 0 ? 36 : 10);

	let textarea: HTMLTextAreaElement | undefined = $state();
</script>

<div class="textarea-wrapper" style="--w: {width}; height: {textarea?.clientHeight}; z-index: {zIndex}">
	{#if icon.length > 0}
		<span class="icon {isError ? 'error' : ''}">
			<Icon name={icon} />
		</span>
	{/if}
	<textarea 
		bind:this={textarea}
		readonly={isImmutable} 
		class="{isError ? 'error' : ''}" 
		onkeydown={(e)=>{onkeydown(e)}} 
		maxlength={maxlength} 
		bind:value 
		{placeholder} 
		style="
			width: {width}; 
			height: {height}; 
			--padding: {padding}px; 
			{style}; 
			background-color: {bgc};
			resize: {resize};
		" 
	></textarea>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.icon {
		position: absolute;
		left: 10px;
		top: 10px;
		width: 16px;
		height: 16px;
		cursor: text;
		z-index: 1;
	}

	.textarea-wrapper {
		position: relative;
		width: var(--w);
		display: flex;
		align-items: center;
	}

	textarea {
		padding-top: 11px;
		padding-bottom: 11px;
		min-height: v.$elem-height;
		display: flex;
		padding: 9px;
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
			padding: 5px;
			padding-left: calc(var(--padding) - 5px);
			border-width: 5px;
		}
		&:active {
			transition: 0.1s;
			padding-left: calc(var(--padding) - 1px);
			border-width: 1px;
		}

		&:focus {
			border: solid;
			border-width: 2px;
			border-color: c.$text-50;
			padding: 8px;
			padding-left: calc(var(--padding) - 1px);
			outline: none;
		}

		&.error{
		background-color: c.$dest-t10 !important; 
		border-color: c.$dest !important; 
		background-image: repeating-linear-gradient(
			-45deg, 
			transparent 15px, 
			c.$dest-t25 15px, 
			c.$dest-t25 35px, 
			transparent 35px, 
			transparent 55px 
		);
	}
	}

	@keyframes shake {
		0% { transform: translateX(0); }
		25% { transform: translateX(-5px); }
		50% { transform: translateX(5px); }
		75% { transform: translateX(-5px); }
		100% { transform: translateX(0); }
	}

	.error {
		animation: shake 0.5s;
	}
</style>
