<script lang="ts">
	// Importing necessary components and utilities
	import Icon from "$lib/kit/decor/Icon.svelte";
	import Textbox from "$lib/kit/text/Textbox.svelte";
    import Button from "$lib/kit/gizmos/Button.svelte";
    import { server, isHttps, port } from "$lib/scripts/globalData";
    import OAuth from "$lib/kit/gizmos/OAuth.svelte";
    import { checkServerReachability } from "$lib/scripts/requests";
    import { isError, errorValue, view } from "$lib/scripts/loginWritables";
    import { _ } from 'svelte-i18n';
	import SwitchableUser from "$lib/kit/gizmos/SwitchableUser.svelte";

    // Bindable property for the height of the login box
    let{
        height = $bindable(370)
    } = $props()

    const tokenList: [] = JSON.parse(localStorage.getItem("tokens") || "")
</script>

<div 
    bind:clientHeight={height}
    class="loginBox"
    style="
        left: {$view == "accountList" ? 0 : -340}px;
    "
>
    <div class="title">
        {$_("loginBox.switchAccount")}
    </div>
    <div class="switcherList">
        {#each tokenList as token}
            <SwitchableUser tokens={tokenList} data={token} index={tokenList.indexOf(token)}/>
        {/each}
    </div>
    <Button
        width="100%"
        action={()=>{view.set("login")}}
        scaleClick={0.95}
        scaleHover={1.05}
    >
        <Icon name="Plus"/>
        {$_("loginBox.addAccount")}
    </Button>
</div>

<style lang="scss">
    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    .switcherList{
        height: 300px;
        width: 320px;
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
    }

    .text{
        white-space: nowrap;
    }

    .oauthGrid{
		width: 100%;
		display: grid;
		gap: v.$spacing-def;
		grid-template-columns: repeat(4, 1fr); 
		grid-template-rows: repeat(2, 1fr); 
	}

    .separator{
        width: 100%;
    }

    .form{
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
    }

    .loginBox{
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

    .title{
        line-height: 1.2;
		width: 100%;
		height: 46px;
		font-size: 26px;
		display: flex;
		align-items: center;
        justify-content: center;
	}
</style>