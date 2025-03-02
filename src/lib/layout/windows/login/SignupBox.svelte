<script lang="ts">
    // Importing necessary components and utilities
	import Icon from "$lib/kit/decor/Icon.svelte";
	import Textbox from "$lib/kit/text/Textbox.svelte";
    import Button from "$lib/kit/gizmos/Button.svelte";
    import { server, isHttps, port } from "$lib/scripts/globalData";
    import { checkServerReachability } from "$lib/scripts/requests";
    import { isError, errorValue, view } from "$lib/scripts/loginWritables";

    let{
        height = $bindable(370)
    } = $props()

    // State variables for user input
    let username = $state("");
    let password = $state("");
    let rePsword = $state("");
    let instance = $state($server);
    let fileserver = $state("amity.neg-zero.com");
    let usertag = $state("");

    // State variables for input validation
    let isUsernameInvalid = $state(false);
    let isPasswordInvalid = $state(false);
    let isInstanceInvalid = $state(false);
    let isRePswordInvalid = $state(false);
    let isTagInvalid = $state(false);

    // Reset form state on "login" view
    view.subscribe((v)=>{
        if(v == "login"){
            isUsernameInvalid = false;
            isPasswordInvalid = false;
            isInstanceInvalid = false;
            isRePswordInvalid = false;
            isTagInvalid = false;

            username = "";
            password = "";
            rePsword = "";
            instance = $server;
            fileserver = "amity.neg-zero.com";
            usertag = "";

            isError.set(false);
        }
    })

    const signUpProcedure = async () =>{
        try{
            // Validate inputs
            if( !username || !password || !instance || !rePsword ){
                if(!username) isUsernameInvalid = true;
                if(!password) isPasswordInvalid = true;
                if(!instance) isInstanceInvalid = true;
                if(!rePsword) isRePswordInvalid = true;
                if(!usertag) isTagInvalid = true;
                isError.set(true);
                errorValue.set("Please fill all spaces")
                return
            }

            // Check server reachability
            const serverReachable = await checkServerReachability(`http${$isHttps ? "s" : ""}://${instance}:${$port}`);
            if (!serverReachable) {
                isError.set(true);
                errorValue.set("Server is unreachable or doesn't exist");
                return;
            }

            // Create user object
            const user = {
                tag: usertag,
                password: password,
                name: username,
                cdn: fileserver
            }

            // Send registration request
            const response = await fetch(`http${$isHttps ? "s" : ""}://${instance}:${$port}/register`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })

            // Handle response
            if(await response.status != 200) {
                console.log(await response)
                isError.set(true);
                errorValue.set(await response.text())
                return
            }

            // Navigate to login view
            view.set("login");
        }catch(e: any){
            // Handle errors
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
        left: {$view == "signup" ? "0" : "340px"};
    "
>
    <div class="title">
        Log in to Amity
    </div>
    <div class="form">
        <div class="elem-horiz">
            <!-- Username input -->
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
            <!-- Instance URL input -->
            <Textbox
                isError={isInstanceInvalid}
                bind:value={instance}
                width="100%; flex-shrink: 1;"
                placeholder="Instance URL"
            />
            <!-- Toggle dev mode -->
            <Button 
                action={()=>{
                    isHttps.set(!$isHttps);
                }}
                style={!$isHttps ? "selected" : "default"}
            >
                <Icon name="Code"/>
            </Button>
        </div>
        <!-- User tag input -->
        <Textbox
            isError={isTagInvalid}
            bind:value={usertag}
            width="100%;"
            placeholder="User tag"
            icon="User"
        />
        <!-- Password input -->
        <Textbox
            isError={isPasswordInvalid}
            bind:value={password}
            width="100%;"
            placeholder="Password"
            icon="Lock/Locked"
            isPassword
        />
        <!-- Confirm password input -->
        <Textbox
            isError={isRePswordInvalid}
            bind:value={rePsword}
            width="100%;"
            placeholder="Confirm Password"
            icon="Lock/Locked"
            isPassword
        />
        <!-- File server input -->
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="Cloud"></Icon> File server <div style="opacity: 0.5;">{fileserver}</div></div>
            <Icon name="Direction/Right"></Icon>
        </Button>
    </div>
    <!-- Cancel button -->
    <div class="elem-horiz">
        <Button
            style="default"
            width="100%; flex-shrink: 1;"
            action={()=>{
                view.set("login");
            }}
        >
            <Icon name="X"/>
            Cancel
        </Button>
        <Button
            action={signUpProcedure}
            style="accent"
            width="100%; flex-shrink: 1;"
        >
            <Icon name="Plus"/>
            Sign up
        </Button>
    </div>
</div>

<style lang="scss">
    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

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