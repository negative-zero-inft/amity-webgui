<script lang="ts">
	import Avatar from '$lib/kit/Avatar.svelte';
	import Button from '$lib/kit/Button.svelte';
	import Icon from '$lib/kit/Icon.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { user } from '$lib/scripts/globalData';

	let banner:string | undefined = $state()
	let username:string | undefined = $state()
	let tag:string | undefined = $state()
	let avatar:string | undefined = $state()

	$effect(()=>{
		try{
			banner =  $user?.banner
			username =  $user?.name
			tag =  `${$user?.tag}@${$user.id.server}`
			avatar =  $user?.avatar
		}catch(e){
			console.log(e)
		}
	})

	let {
		notifCount
	} = $props();

	const isUserBar = getContext<Writable<boolean>>('isUserBar');
</script>

<div class="barTop">
	<img src={banner} class="banner" alt="banner" />
	<div class="top">
		<Button action={() => isUserBar.set(false)}><Icon name="Direction/Left"></Icon></Button>
		<Button><Icon name="Bell"></Icon>{notifCount}</Button>
	</div>
	<div class="bottom">
		<Avatar pfpLink={avatar}></Avatar>
		<div class="username">
			<div class="name">
				{username}
			</div>
			<div class="tag">
				{tag}
			</div>
		</div>
		<Button action={()=>{
			navigator.clipboard.writeText(`https://${$user.id.server}/user/${$user.id.id}/info`)
		}}><Icon name="Share/Alt"></Icon></Button>
		<Button><Icon name="Switch"></Icon></Button>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.tag{
		text-overflow: ellipsis; 
		width: 100%;
		white-space: nowrap; 
		overflow: hidden;
		height: 15px !important;
	}

	.username {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-width: 160px;
		& .name{
			font-weight: bold;
			text-overflow: ellipsis; 
			width: 100%;
			white-space: nowrap; 
			overflow: hidden;
		}
	}
	.bottom {
		display: flex;
		gap: v.$spacing-def;
	}
	.top {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.banner {
		position: absolute;
		left: 0;
		top: 0;
		width: 320px;
		height: 150px;
		z-index: -1;
		object-fit: cover;
	}
	.barTop {
		position: relative;
		height: 150px;
		width: 320px;
		display: flex;
		padding: 10px;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: space-between;
		flex-shrink: 0;
	}
</style>
