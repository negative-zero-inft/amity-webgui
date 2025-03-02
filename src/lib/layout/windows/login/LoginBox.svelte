<script lang="ts">
	import Icon from "$lib/kit/decor/Icon.svelte";
	import Textbox from "$lib/kit/text/Textbox.svelte";
    import Button from "$lib/kit/gizmos/Button.svelte";
    import { server, isHttps, port } from "$lib/scripts/globalData";
    import OAuth from "$lib/kit/gizmos/OAuth.svelte";
    import { checkServerReachability } from "$lib/scripts/requests";
    import { isError, errorValue, view } from "$lib/scripts/loginWritables";
    let{
        height = $bindable(370)
    } = $props()

    let username = $state("");
    let password = $state("");
    let instance = $state($server);

    let isUsernameInvalid = $state(false);
    let isPasswordInvalid = $state(false);
    let isInstanceInvalid = $state(false);

    view.subscribe((v)=>{
        if(v == "signup"){
            isUsernameInvalid = false;
            isPasswordInvalid = false;
            isInstanceInvalid = false;

            username = "";
            password = "";
            instance = $server;

            isError.set(false);
        }
    })

    const signInProcedure = async () =>{
        try{

            if( !username || !password || !instance ){
                if(!username) isUsernameInvalid = true;
                if(!password) isPasswordInvalid = true;
                if(!instance) isInstanceInvalid = true;
                isError.set(true);
                errorValue.set("Please fill all spaces")
                return
            }

            const serverReachable = await checkServerReachability(`http${$isHttps ? "s" : ""}://${instance}:${$port}`);
            if (!serverReachable) {
                isError.set(true);
                errorValue.set("Server is unreachable or doesn't exist");
                return;
            }

            const response = await fetch(`http${$isHttps ? "s" : ""}://${instance}:${$port}/signin`, {
                method: "POST",
                body: JSON.stringify({
                    tag: `${username}@${instance}`,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            if(await response.status != 200) {
                console.log(await response)
                isError.set(true);
                errorValue.set(await response.text())
                return
            }
            localStorage.setItem("token", await response.text())
            localStorage.setItem("server", instance)
            isError.set(false);
            window.location.replace("/chat")
        }catch(e: any){

            isError.set(true);
            errorValue.set(e);
            return
        }
    }
</script>

<div 
    bind:clientHeight={height}
    class="loginBox"
    style="
        left: {$view == "login" ? "0" : "-340px"};
    "
>
    <div class="title">
        Log in to Amity
    </div>
    <div class="form">
        <div class="elem-horiz">
            <Textbox
                isError={isUsernameInvalid}
                onkeydown={()=>{
                    isUsernameInvalid = false;
                }}
                bind:value={username}
                width="100%; flex-shrink: 1;"
                icon="User"
                placeholder="Username"
            />
            <Icon name="AtSign"/>
            <Textbox
                isError={isInstanceInvalid}
                bind:value={instance}
                width="100%; flex-shrink: 1;"
                placeholder="Instance URL"
            />
            <Button 
                action={()=>{
                    isHttps.set(!$isHttps);
                }}
                style={!$isHttps ? "selected" : "default"}
            >
                <Icon name="Code"/>
            </Button>
        </div>
        <Textbox
            isError={isPasswordInvalid}
            bind:value={password}
            width="100%;"
            placeholder="Password"
            icon="Lock/Locked"
            isPassword
        />
        <div class="elem-horiz">
            <Button
                style="default"
                width="100%; flex-shrink: 1;"
                action={()=>{
                    view.set("signup");
                }}
            >
                <Icon name="Plus"/>
                Sign up
            </Button>
            <Button
                action={signInProcedure}
                style="accent"
                width="100%; flex-shrink: 1;"
            >
                <Icon name="Login"/>
                Log in
            </Button>
        </div>
    </div>
    <div class="elem-horiz" style="width: 100%;">
        <hr class="separator"/>
        <div class="text">
            Or, sign in with...
        </div>
        <hr class="separator"/>
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

    .text{
        white-space: nowrap;
    }

    .oauthGrid{
		width: 100%;
		display: grid;
		gap: v.$spacing-def;
		grid-template-columns: repeat(4, 1fr); /* 7 equal-width columns */
		grid-template-rows: repeat(2, 1fr); /* 3 equal-height rows */
	}

    .separator{
        width: 100%;
    }

    .form{
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
    }

    .elem-horiz{
        align-items: center;
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
		width: 100%;
		height: 46px;
		font-size: 26px;
		display: flex;
		align-items: center;
        justify-content: center;
	}
</style>