<script lang="ts">
    import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";
	import Textbox from "$lib/kit/Textbox.svelte";
	import { server } from "$lib/scripts/globalData";
    import { userdata } from "$lib/scripts/globalData";

    let{
        isLogin 
    } = $props()

    let tag:string | undefined = $state();
    let pass:string | undefined = $state();
    
    const changeView = () =>{
        isLogin.set(!$isLogin)
        tag = ""
        pass = ""
    }

    const signInProcedure = async () =>{
        if( !tag || !pass ) return // TODO: user-friendly error catcher 
        if( !tag.match("@") ) return

        const response = await fetch(`http://${$server}/signin`, {
            method: "POST",
            body: JSON.stringify({
                tag: tag,
                password: pass
            }),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        userdata.set({
            amityID: {
                id: "",
                server: ""
            },
            token: await response.text()
        })

        console.log($userdata)
    }
</script>

<div class="loginBox" style="
    left: {$isLogin ? "0" : "-300px"};
    pointer-events: {$isLogin ? "auto" : "none"};
    padding: {$isLogin ? "10px" : "0" };
">
    <div class="title">Log in to Amity</div>
    <div class="inputs">
        <Textbox bind:value={tag} width="100%" icon="User" placeholder="User tag"></Textbox>
        <Textbox bind:value={pass} isPassword width="100%" icon="Lock/Locked" placeholder="Password"></Textbox>
        <a href="https://skibidi.pneumonoultramicroscopicsilicovolcanoconiosis.site">Forgot your password?</a>
    </div>
    <div class="buttons">
        <Button width="100%; flex-shrink: 1;" action={changeView}><Icon name="Plus"></Icon>Create account</Button>
        <Button action={signInProcedure} width="100%; flex-shrink: 1;" style={1}><Icon name="Login"></Icon>Log in</Button>
    </div>
    <div class="oauthSeparator">
        <hr style="width: 100%" class="separator"/>
        <div style="width: max-content; flex-shrink: 0;">Or, sign in with </div>
        <hr style="width: 100%" class="separator"/>
    </div>
    <div class="oauthGrid">
        <Button width="100%; flex-shrink: 1;"><Icon name="Google"></Icon></Button>
        <Button width="100%; flex-shrink: 1;"><Icon name="Apple"></Icon></Button>
        <Button width="100%; flex-shrink: 1;"><Icon name="Objects"></Icon></Button>
        <Button width="100%; flex-shrink: 1;"><Icon name="Discord"></Icon></Button>
        <Button width="100%; flex-shrink: 1;"><Icon name="Telegram"></Icon></Button>
        <Button width="100%; flex-shrink: 1;"><Icon name="Github"></Icon></Button>
        <Button width="100%; flex-shrink: 1;"><Icon name="Mastodon"></Icon></Button>
        <Button width="100%; flex-shrink: 1;">OSU</Button>
    </div>
</div>

<style lang="scss">

    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    .loginBox{
        flex-shrink: 0;
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;
        transition: 0.25s;
        flex-wrap: 0;
        position: relative;
    }

    .oauthGrid{
		width: 100%;
		display: grid;
		gap: v.$spacing-def;
		grid-template-columns: repeat(4, 1fr); /* 7 equal-width columns */
		grid-template-rows: repeat(2, 1fr); /* 3 equal-height rows */
	}

	.oauthSeparator{
		display: flex;
		width: 100%;
		align-items: center;
		gap: v.$spacing-def;
	}

	.buttons{
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		width: 100%;
	}

	.inputs{
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: v.$spacing-def;
	}

	.title{
		width: max-content;
		height: 46px;
		font-size: 26px;
		display: flex;
		align-items: center;
	}
</style>