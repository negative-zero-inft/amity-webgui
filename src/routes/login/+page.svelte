<script lang="ts">
	import Icon from "$lib/kit/decor/Icon.svelte";
	import amy from "$lib/amy.svg"
	import LoginBox from "$lib/layout/windows/login/LoginBox.svelte";
	import SignupBox from "$lib/layout/windows/login/SignupBox.svelte";
	import { isError, errorValue, view } from "$lib/scripts/loginWritables";
	import { isHttps } from "$lib/scripts/globalData";
	import LingoWindow from "$lib/layout/devTools/DevWindow.svelte";
	import { _ } from "svelte-i18n";

	$effect(()=>{
		if(localStorage.getItem("token")) window.location.replace("/chat")
	})

	let loginHeight = $state(0);
	let signupHeight = $state(0);
</script>

<div 
	class="loginBg"
>
	<div 
		id="idiotproofing"
		class="error" 
		style="
			top: {!$isHttps ? "10px" : "50vh"};
			scale: {$isHttps ? "0" : "1"};
		"
	>	
		<div class="elem-horiz">
			<Icon name="Warning"></Icon>{$_("login.devMode0")}
		</div>
		<div class="elem-horiz">
			<Icon name="Warning"></Icon>{$_("login.devMode1")}<Icon name="Code"></Icon>{$_("login.devMode2")}
		</div>
	</div>
	<div 
		id="loginWindow"
		class="window" 
		style="
			height: {$view == "login" ? loginHeight : signupHeight}px;
		"
	>
		<LoginBox bind:height={loginHeight}/>
		<SignupBox bind:height={signupHeight}/>
	</div>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div 
		onclick={()=>{isError.set(false)}} 
		style="
			transform: scale({$isError ? "1" : "0"}); 
			opacity: {$isError ? "1" : "0"};
		" 
		class="error"
	>
		<Icon name="Warning"></Icon>{$errorValue}
	</div>


	<img alt="Amy" class="amy" src={amy}/>
</div>

<LingoWindow/>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	#idiotproofing{
		flex-direction: column;
		align-items: flex-start;
		width: max-content; 
		transition: 0.25s;
	}

	#loginWindow{
		width: 340px; 
		padding: 0; 
		gap: 0;
	}
	
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
		background-color: c.$accent-t10;
		border-radius: v.$corner-window;
		border: solid;
		border-width: 1px;
		z-index: 2137;
		border-color: c.$accent;
		background-image: repeating-linear-gradient(
			-45deg,
			transparent 15px,
			rgba(255, 0, 0, 0.25) 15px,
			rgba(255, 0, 0, 0.25) 35px,
			transparent 35px,
			transparent 55px /* added this so the pattern repeats seamlessly */
		);
		&:hover{
			background-color: c.$accent-t40;
			scale: 1.1;
		}
		&:active{
			scale: 0.9;
			background-color: c.$accent-t80;
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
