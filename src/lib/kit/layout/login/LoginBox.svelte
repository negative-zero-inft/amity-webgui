<script lang="ts">
    import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";
	import Textbox from "$lib/kit/Textbox.svelte";
	import { isHttps, port, server } from "$lib/scripts/globalData";
	import { errorValue, isError } from "$lib/scripts/loginWritables";
	import { error } from "@sveltejs/kit";
	import OAuth from "./OAuth.svelte";

    let{
        isLogin 
    } = $props()

    let tag:string | undefined = $state();
    let pass:string | undefined = $state();
    let instance:string | undefined = $state($server);
    
    const changeView = () =>{
        isLogin.set(!$isLogin)
        tag = ""
        pass = ""
    }

    async function checkServerReachability(url:string) {
        try {
            const response = await fetch(url, {
                cache: 'no-cache'
            });

            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    const signInProcedure = async () =>{
        try{
            if( !tag || !pass || !instance ){
                isError.set(true)
                errorValue.set("Please fill all spaces")
                return
            }

            const serverReachable = await checkServerReachability(`http${$isHttps ? "s" : ""}://${insrv}:${$port}`);
            if (!serverReachable) {
                isError.set(true);
                errorValue.set("Server is unreachable or doesn't exist");
                return;
            }

            const response = await fetch(`http${$isHttps ? "s" : ""}://${instance}:${$port}/signin`, {
                method: "POST",
                body: JSON.stringify({
                    tag: `${tag}@${instance}`,
                    password: pass
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            if(await response.status != 200) {
                console.log(await response)
                isError.set(true)
                errorValue.set(await response.text())
                return
            }
            localStorage.setItem("token", await response.text())
            localStorage.setItem("server", instance)
            isError.set(false)
            window.location.replace("/chat")
        }catch(e: any){

            isError.set(true)
            errorValue.set(e)
            return
        }
    }
</script>

<div class="loginBox" style="
    left: {$isLogin ? "0" : "-320px"};
    pointer-events: {$isLogin ? "auto" : "none"};
    padding: {$isLogin ? "10px" : "0" };
">
    <div class="title">Log in to Amity</div>
    <div class="inputs">
        <div class="elements-horiz">
            <Textbox onkeydown={(e:any)=>{
                if(e.key == "Enter") signInProcedure()
            }} bind:value={tag} width="100%" icon="User" placeholder="Username"></Textbox>
            <Icon name="AtSign"></Icon>
            <Textbox onkeydown={(e:any)=>{
                if(e.key == "Enter") signInProcedure()
            }} bind:value={instance} width="100%" placeholder="Server"></Textbox>
        </div>
        <Textbox onkeydown={(e:any)=>{
            if(e.key == "Enter") signInProcedure()
        }} bind:value={pass} isPassword width="100%" icon="Lock/Locked" placeholder="Password"></Textbox>
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

    .elements-horiz{
        align-items: center;
        gap: v.$spacing-def;
    }

    .loginBox{
        flex-shrink: 0;
        width: 320px;
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