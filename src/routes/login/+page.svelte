<script lang="ts">
	import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";
	import Textbox from "$lib/kit/Textbox.svelte";
	import amy from "$lib/amy.svg"
	import QRCode from '@castlenine/svelte-qrcode';
	import LoginBox from "$lib/kit/layout/login/LoginBox.svelte";
	import SignupBox from "$lib/kit/layout/login/SignupBox.svelte";
	import { writable } from "svelte/store";
	import { errorValue, isError } from "$lib/scripts/loginWritables";

	let isLogin = writable<boolean>(true);

	$effect(()=>{
		if(localStorage.getItem("token")) window.location.replace("/chat")
	})

</script>

<div class="loginBg">
	<div class="window" style="width: 320px; height: 370px; flex-direction: row; padding: 0; gap: 0;">
		<LoginBox isLogin={isLogin}></LoginBox>
		<SignupBox isLogin={isLogin}></SignupBox>
	</div>
	<!-- {#if $isError} -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div onclick={()=>{isError.set(false)}} style="transform: scale({$isError ? "1" : "0"}); opacity: {$isError ? "1" : "0"};" class="error">
			<Icon name="Warning"></Icon>{$errorValue}
		</div>
	<!-- {/if} -->

	<img alt="Amy" class="amy" src={amy}/>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;
	
	.error{
		overflow: hidden;
		position: absolute;
		bottom: 10px;
		transition: 0.25s;
		gap: v.$spacing-def;
		font-size: 16px;
		width: 320px;
		height: max-content;
		padding: 10px;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		background-color: c.$accent-t40;
		border-radius: v.$corner-window;
		border: solid;
		border-width: 1px;
		border-color: c.$accent;
		background-image: repeating-linear-gradient(
			-45deg,
			transparent 25%,
			rgba(255, 0, 0, 0.5) 25%,
			rgba(255, 0, 0, 0.5) 75%,
			transparent 75%,
			transparent
		);
		&:hover{
			background-color: c.$accent-t80;
			scale: 1.1;
		}
	}

	.amy{
		position:fixed;
		width: 780px;
		opacity: 0.25;
		right: -200px;
		bottom: -200px;
	}

	.loginBg{
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(#300000, #000000);
		gap: v.$spacing-def;
		overflow: hidden;
		flex-direction: column;
	}

	.window {
		padding: v.$spacing-def;
		background-color: c.$bg;
		border-radius: v.$corner-window;
		border: solid;
		border-color: c.$text-25;
		border-width: 1px;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 16px;
		overflow: hidden;
		z-index: 7;
		// position: absolute;
	}
</style>
