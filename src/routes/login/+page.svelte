<script lang="ts">
	import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";
	import Textbox from "$lib/kit/Textbox.svelte";
	import amy from "$lib/amy.svg"
	import QRCode from '@castlenine/svelte-qrcode';
	import LoginBox from "$lib/kit/layout/login/LoginBox.svelte";
	import SignupBox from "$lib/kit/layout/login/SignupBox.svelte";
	import { writable } from "svelte/store";

	let isLogin = writable<boolean>(true);

</script>

<div class="loginBg">
	<div class="window" style="width: 320px; height: 370px; flex-direction: row; padding: 0; gap: 0;">
		<LoginBox isLogin={isLogin}></LoginBox>
		<SignupBox isLogin={isLogin}></SignupBox>
	</div>

	<img alt="Amy" class="amy" src={amy}/>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

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
