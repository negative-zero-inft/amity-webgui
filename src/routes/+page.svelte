<script lang="ts">
	import closeup from '../lib/closeup.png';
	import amy from '../lib/amy.svg';
	import Button from '$lib/kit/gizmos/Button.svelte';
	import Icon from '$lib/kit/decor/Icon.svelte';
	import LingoWindow from '$lib/layout/devTools/DevWindow.svelte';
	import {_} from 'svelte-i18n';

</script>

<div class="main">
	<div style="width: 100%;"></div>
	<div class="side">
		<div class="logo">
			<img style="width: 80px; height: 80px;" src={amy} alt="amy" />
			Amity
		</div>
		<div class="slogan">
			<div style="width: max-content; font-size: 36px;">{$_("start.slogan")}</div>
			<div class="underslogan">
				{$_("start.aboutAmity")}
			</div>
		</div>
		<div class="cta">
			<Button
				action={() => {
					window.location.replace(window.location.toString() + 'chat');
				}}
				width="230px"
				alignment="space-between"
				style="accent"
			>
				<div style="display: flex; gap: 10px; align-items: center;">
					<Icon name="Window"></Icon>
					{$_('start.demo')}
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button>
			<!-- <Button width="230px" alignment="space-between">
				<div style="display: flex; gap: 10px; align-items: center;">
					<Icon name="Cloud"></Icon>
					Host your own instance
				</div>
				<Icon name="Direction/Right"></Icon>
			</Button> -->
		</div>
	</div>
	<img class="closeup" src={closeup} alt="ui closeup" />
</div>

<LingoWindow/>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.cta {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.underslogan {
		width: 100%;
	}
	.slogan {
		@include v.big-text();
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.logo {
		display: flex;
		flex-direction: row;
		font-size: 50px;
		align-items: center;
		gap: 20px;
	}
	.side {
		width: 600px;
		flex-grow: 1;
		height: 100%;
		padding-left: 100px;
		padding-top: 100px;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: 16px;
		left: 0;
		position: absolute;
	}

	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		width: 100vw;
		height: 100vh;
	}

	.closeup {
		height: 100vh;
	}

	.main {
		// background: rgb(48, 0, 0);
		background: radial-gradient(circle at 20% 20%, rgba(48, 0, 0, 1) 0%, rgba(17, 0, 0, 1) 50%);
	}
</style>
