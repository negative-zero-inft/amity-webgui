<script lang="ts">
	// Importing necessary components and utilities
	import Icon from "$lib/kit/decor/Icon.svelte";
    import Button from "$lib/kit/gizmos/Button.svelte";
    import { view } from "$lib/scripts/loginWritables";
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
        width="calc(100% - 20px); margin: 10px;"
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
        overflow-y: scroll;
        overflow-x: hidden;
        padding: v.$spacing-def;
    }

    .loginBox{
        transition: 0.25s;
        width: 340px; 
		height: max-content; 
		flex-direction: row; 
		gap: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        position: absolute;
    }

    .title{
        margin: 10px;
        line-height: 1.2;
		width: calc(100% - 20px);
		height: 46px;
		font-size: 26px;
		display: flex;
		align-items: center;
        justify-content: center;
	}
</style>