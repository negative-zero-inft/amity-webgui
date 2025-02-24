<script lang="ts">
    import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";
	import Textbox from "$lib/kit/Textbox.svelte";
	import { server, isHttps, port } from "$lib/scripts/globalData";
	import { errorValue, isError } from "$lib/scripts/loginWritables";

    let{
        isLogin 
    } = $props()

    let dname:string | undefined = $state();
    let uname:string | undefined = $state();
    let fpass:string | undefined = $state();
    let rpass:string | undefined = $state();

    let fileserver = "amycdn.neg-zero.com"

    const signupProcedure = async () =>{
        
        try{
            if(!dname || !uname || !fpass || !rpass){
                console.log("a")
                isError.set(true)
                errorValue.set("Please fill all spaces")
                return
            }
            if(fpass != rpass){
                isError.set(true)
                errorValue.set("Passwords don't match")
                return
            }
            for (let i = 0; i < uname.length; i++) {
                if (uname.charCodeAt(i) > 127 || uname.charAt(i) == " " || uname.charAt(i) == "@") {
                    isError.set(true)
                    errorValue.set("Usernames can only contain ASCII characters and can't include the @ symbol or spaces")
                    return
                }
            }
            
            const user = {
                tag: uname,
                password: rpass,
                name: dname,
                cdn: fileserver
            }
    
            const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/register`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            
            if(response.status == 200){
                changeView()
            }else{
                let error:string = await response.text()
                isError.set(true)
                if(error.match("dup key")) return errorValue.set("This user already exists")
                errorValue.set(error)
                return
            }
        }catch(e: any){
            isError.set(true)
            errorValue.set(e)
            return
        }
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
        <Textbox onkeydown={(e:any)=>{
            if(e.key == "Enter") signupProcedure()
        }} maxlength={64} bind:value={dname} width="100%" icon="Rename" placeholder="Display name"></Textbox>
        <Textbox onkeydown={(e:any)=>{
            if(e.key == "Enter") signupProcedure()
        }} maxlength={32} bind:value={uname} width="100%" icon="User" placeholder="Username"></Textbox>
        <Textbox onkeydown={(e:any)=>{
            if(e.key == "Enter") signupProcedure()
        }} isPassword maxlength={64} bind:value={fpass} width="100%" icon="Lock/Locked" placeholder="Password"></Textbox>
        <Textbox onkeydown={(e:any)=>{
            if(e.key == "Enter") signupProcedure()
        }} isPassword maxlength={64} bind:value={rpass} width="100%" icon="Lock/Locked" placeholder="Repeat password"></Textbox>
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