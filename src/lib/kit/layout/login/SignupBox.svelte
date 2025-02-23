<script lang="ts">
    import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";
	import Textbox from "$lib/kit/Textbox.svelte";
	import { server } from "$lib/scripts/globalData";

    let{
        isLogin 
    } = $props()

    let dname:string | undefined = $state();
    let uname:string | undefined = $state();
    let fpass:string | undefined = $state();
    let rpass:string | undefined = $state();

    let fileserver = "amycdn.neg-zero.com"

    const signupProcedure = () =>{
        if(!dname || !uname || !fpass || !rpass) return // TODO: user-friendly error catcher 
        if(fpass != rpass) return
        for (let i = 0; i < uname.length; i++) {
            if (uname.charCodeAt(i) > 127) {
                return
            }
        }
        
        const user = {
            tag: uname,
            password: rpass,
            name: dname,
            cdn: fileserver
        }

        const request = async () => {
            const response = await fetch(`http://${$server}/register`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return await response
        }

        const response = request()

        console.log(response)
    }

    const changeView = () =>{
        isLogin.set(!$isLogin)
        dname = ""
        uname = ""
        fpass = ""
        rpass = ""
    }
</script>

<div class="loginBox" style="
    left: {!$isLogin ? "-300px" : "320px"};
    pointer-events: {!$isLogin ? "auto" : "none"};
    padding: {!$isLogin ? "10px" : "0" };
">
    <div class="title">Sign up for Amity</div>
    <div class="inputs">
        <Textbox maxlength={64} bind:value={dname} width="100%" icon="Rename" placeholder="Display name"></Textbox>
        <Textbox maxlength={32} bind:value={uname} width="100%" icon="User" placeholder="Username"></Textbox>
        <Textbox isPassword maxlength={64} bind:value={fpass} width="100%" icon="Lock/Locked" placeholder="Password"></Textbox>
        <Textbox isPassword maxlength={64} bind:value={rpass} width="100%" icon="Lock/Locked" placeholder="Repeat password"></Textbox>
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="Cloud"></Icon> File server <div style="opacity: 0.5;">amycdn.neg-zero.com</div></div>
            <Icon name="Direction/Right"></Icon></Button
        >
    </div>
    <div class="buttons">
        <Button width="100%; flex-shrink: 1;" action={changeView}><Icon name="Direction/Left"></Icon>Go back</Button>
        <Button width="100%; flex-shrink: 1;" action={signupProcedure} style={1}><Icon name="Plus"></Icon>Create account</Button>
    </div>
</div>

<style lang="scss">

    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    .elem-horiz {
		display: flex;
		gap: v.$spacing-def;
		align-items: center;
	}

    .loginBox{
        flex-shrink: 0;
        width: 300px;
        height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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