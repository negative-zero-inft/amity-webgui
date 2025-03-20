<script lang="ts">
	// Importing necessary components and utilities
	import Icon from '$lib/kit/decor/Icon.svelte';
	import Textbox from '$lib/kit/text/Textbox.svelte';
	import Button from '$lib/kit/gizmos/Button.svelte';
	import { server, port } from '$lib/scripts/globalData';
	import OAuth from '$lib/kit/gizmos/OAuth.svelte';
	import { checkServerReachability } from '$lib/scripts/requests';
	import { isError, errorValue, view, isHttpsL } from '$lib/scripts/loginWritables';
	import { _ } from 'svelte-i18n';

	// Bindable property for the height of the login box
	let { height = $bindable(370) } = $props();

	// State variables for user input
	let username = $state('');
	let password = $state('');
	let instance = $state($server);

	// State variables for input validation
	let isUsernameInvalid = $state(false);
	let isPasswordInvalid = $state(false);
	let isInstanceInvalid = $state(false);

	let isWaiting = $state(false)

	// Subscribe to view changes to reset form state on "signup" view
	view.subscribe((v) => {
		if (v == 'signup') {
			isUsernameInvalid = false;
			isPasswordInvalid = false;
			isInstanceInvalid = false;

			username = '';
			password = '';
			instance = $server;

			isError.set(false);
		}
	});

	const signInProcedure = async () => {
		isWaiting = true
		try {
			// Validate inputs
			if (!username || !password || !instance) {
				if (!username) isUsernameInvalid = true;
				if (!password) isPasswordInvalid = true;
				if (!instance) isInstanceInvalid = true;
				isError.set(true);
				errorValue.set($_('loginBox.fillAllSpaces'));
				isWaiting = false
				return;
			}

			// Check server reachability
			const serverReachable = await checkServerReachability(
				`http${$isHttpsL ? 's' : ''}://${instance}:${$port}`
			);
			if (!serverReachable) {
				isError.set(true);
				errorValue.set($_('loginBox.serverUnreachable'));
				isWaiting = false
				return;
			}

			// Attempt to sign in
			const response = await fetch(`http${$isHttpsL ? 's' : ''}://${instance}:${$port}/auth/login`, {
				method: 'POST',
				body: JSON.stringify({
					tag: `${username}@${instance}`,
					password: password
				}),
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});

			// Handle response
			if ((await response.status) != 200) {
				console.error(await response);
				isError.set(true);
				errorValue.set(await response.text());
				isWaiting = false
				return;
			}

			const res = await response.json();
			const t = {
				token: res.token,
				server: instance,
				isHttps: $isHttpsL,
				authNumber: res.authNumber
			};

			const tokens: {
				token: string;
				server: string;
				isHttps: boolean;
				authNumber: number;
			}[] = JSON.parse(localStorage.getItem('tokens') || '[]');

			// Store token and server info on successful login
			if (tokens.indexOf(t) == -1) {
				tokens.push(t);
				localStorage.setItem('tokens', JSON.stringify(tokens));
			}
			isError.set(false);
			window.location.replace(`/chat?token=${tokens.indexOf(t)}`);
		} catch (e: any) {
			// Handle errors
			console.error(e);
			isError.set(true);
			errorValue.set(e);
			isWaiting = false;
			return;
		}
		isWaiting = false
	};
</script>

<div
	bind:clientHeight={height}
	class="loginBox"
	style="
        left: {$view == 'login' ? 0 : $view == 'accountList' ? 340 : -340}px;
    "
>
	<div class="title">
		{$_('loginBox.loginGreet')}
	</div>
	<div class="form">
		<div class="elem-horiz">
			<!-- Username input -->
			<Textbox
				isError={isUsernameInvalid}
				onkeydown={(e: KeyboardEvent) => {
					isUsernameInvalid = false;
					if (e.key == 'Enter') {
						signInProcedure();
					}
				}}
				bind:value={username}
				width="100%; flex-shrink: 1;"
				icon="User"
				placeholder={$_('loginBox.username')}
			/>
			<Icon name="AtSign" />

			<!-- Instance URL input -->
			<Textbox
				isError={isInstanceInvalid}
				onkeydown={(e: KeyboardEvent) => {
					isInstanceInvalid = false;
					if (e.key == 'Enter') {
						signInProcedure();
					}
				}}
				bind:value={instance}
				width="100%; flex-shrink: 1;"
				placeholder={$_('loginBox.instanceURL')}
			/>

			<!-- Toggle dev mode -->
			<Button
				width="36px"
				action={(e: KeyboardEvent) => {
					isHttpsL.set(!$isHttpsL);
					if (e.key == 'Enter') {
						signInProcedure();
					}
				}}
				style={!$isHttpsL ? 'selected' : 'default'}
			>
				<Icon name="Code" />
			</Button>
		</div>

		<!-- Password input -->
		<Textbox
			isError={isPasswordInvalid}
			onkeydown={(e: KeyboardEvent) => {
				isPasswordInvalid = false;
				if (e.key == 'Enter') {
					signInProcedure();
				}
			}}
			bind:value={password}
			width="100%;"
			placeholder={$_('loginBox.password')}
			icon="Lock/Locked"
			isPassword
		/>
		<a href="mascots/Dobby.png">{$_('loginBox.forgotpassword')}</a>
		<div class="elem-horiz">
			<!-- Sign up button -->
			<Button
				style="default"
				width="100%; flex-shrink: 1;"
				action={() => {
					view.set('signup');
				}}
			>
				<Icon name="Plus" />
				{$_('loginBox.signup')}
			</Button>

			<!-- Log in button -->
			<Button action={signInProcedure} style="accent" width="100%; flex-shrink: 1;" isWaiting={isWaiting}>
				<Icon name="Login" />
				{$_('loginBox.login')}
			</Button>
		</div>
	</div>

	<!-- Separator -->
	<div class="elem-horiz" style="width: 100%;">
		<hr class="separator" />
		<div class="text">
			{$_('loginBox.signinwith')}
		</div>
		<hr class="separator" />
	</div>

	<!-- OAuth options -->
	<div class="oauthGrid">
		<OAuth name="google"><Icon name="Google"></Icon></OAuth>
		<OAuth name="apple"><Icon name="Apple"></Icon></OAuth>
		<OAuth name="objects"><Icon name="Objects"></Icon></OAuth>
		<OAuth name="discord"><Icon name="Discord"></Icon></OAuth>
		<OAuth name="telegram"><Icon name="Telegram"></Icon></OAuth>
		<OAuth name="github"><Icon name="Github"></Icon></OAuth>
		<OAuth name="mastodon"><Icon name="Mastodon"></Icon></OAuth>
		<OAuth name="osu"><Icon name="Osu/Default"></Icon></OAuth>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.text {
		white-space: nowrap;
	}

	.oauthGrid {
		width: 100%;
		display: grid;
		gap: v.$spacing-def;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}

	.separator {
		width: 100%;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
	}

	.loginBox {
		transition: 0.25s;
		width: 340px;
		height: max-content;
		flex-direction: row;
		padding: v.$spacing-def;
		gap: 16px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		position: absolute;
	}

	.title {
		line-height: 1.2;
		width: 100%;
		height: 46px;
		font-size: 26px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
