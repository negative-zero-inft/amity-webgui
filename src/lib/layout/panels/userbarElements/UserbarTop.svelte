<script lang="ts">
	import Icon from "$lib/kit/decor/Icon.svelte";
    import Button from "$lib/kit/gizmos/Button.svelte";
    import { isUserBar } from "$lib/scripts/chatViews";
    import Avatar from "$lib/kit/decor/Avatar.svelte";
    import { user, server } from "$lib/scripts/globalData";
    import { _ } from "svelte-i18n";
    import { isReLogin } from "$lib/scripts/chatViews";
	import { view } from "$lib/scripts/loginWritables";

    let banner:string | undefined = $state("/defaultBanner.png")
	let username:string | undefined = $state()
	let tag:string | undefined = $state()
	let avatar:string | undefined = $state("/mascots/Amy.png")

	$effect(()=>{
		try{
			banner =  $user?.banner || "/defaultBanner.png" as string
			username =  $user?.name
			tag =  `${$user?.tag}@${$server}`
			avatar =  $user?.avatar || "/mascots/Amy.png" as string
		}catch(e){
			// console.log(e)
		}
	})

</script>

<div class="userbar-top">
	<img src={banner} class="banner" alt="banner" onerror={()=>{
		banner = "/defaultBanner.png"
	}} />
    <div
        id="top" 
        class="elem-horiz">
        <Button
            action={()=>{
                isUserBar.set(false)
            }}
            tooltip={$_("sidebar.userbar.tooltips.backButton")}
        >
            <Icon name="Direction/Left"/>
        </Button>
        <Button
            tooltip={$_("sidebar.userbar.tooltips.notifButton")}
        >
            <Icon name="Bell"/>0
        </Button>
    </div>
    <div 
        class="elem-horiz"
        id="bottom"
    >
        <Avatar pfpLink={avatar}></Avatar>
		<div class="username">
			<div class="name">
				{username}
			</div>
			<div class="tag">
				{tag}
			</div>
		</div>
		<Button 
            action={()=>{
                navigator.clipboard.writeText(`https://${$user?.id.server}/user/${$user?.id.id}/info`)
            }}
            tooltip={$_("sidebar.userbar.tooltips.copyTag")}
        >
            <Icon name="Share/Alt"></Icon>
        </Button>
		<Button
            tooltip={$_("sidebar.userbar.tooltips.switchAccount")}
            action={()=>{
                isReLogin.set(!$isReLogin)
                view.set("accountList")
            }}
        >
            <Icon name="Switch"/>
        </Button>
    </div>
</div>

<style lang="scss">
    
    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .tag{
		text-overflow: ellipsis; 
		width: 100%;
		white-space: nowrap; 
		overflow: hidden;
		height: 15px !important;
	}

	.username {
        flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-width: 160px;
        height: v.$elem-height;
		& .name{
			font-weight: bold;
			text-overflow: ellipsis; 
			width: 100%;
			white-space: nowrap; 
			overflow: hidden;
		}
	}

    .userbar-top{
        display: flex;
        flex-direction: column;
        height: 150px;
        width: 320px;
        justify-content: space-between;
    }

    #bottom{
        padding: v.$spacing-def;
        justify-content: space-between;
    }

    #top{
        padding: v.$spacing-def;
        justify-content: space-between;
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
</style>