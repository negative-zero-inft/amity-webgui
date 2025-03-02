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
    let insrv:string | undefined = $state($server);
    let isDnameInvalid: boolean = $state(false);
    let isUnameInvalid: boolean = $state(false);
    let isFpassInvalid: boolean = $state(false);
    let isRpassInvalid: boolean = $state(false);
    let isInsrvInvalid: boolean = $state(false);

    let fileserver = "amycdn.neg-zero.com"

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

    const signupProcedure = async () =>{
        
        try{
            if(!dname || !uname || !fpass || !rpass || !insrv){
                if(!dname) isDnameInvalid = true;
                if(!uname) isUnameInvalid = true;
                if(!fpass) isFpassInvalid = true;
                if(!rpass) isRpassInvalid = true;
                if(!insrv) isInsrvInvalid = true;
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

            const serverReachable = await checkServerReachability(`http${$isHttps ? "s" : ""}://${insrv}:${$port}`);
            if (!serverReachable) {
                isError.set(true);
                errorValue.set("Server is unreachable or doesn't exist");
                return;
            }
            
            const user = {
                tag: uname,
                password: rpass,
                name: dname,
                cdn: fileserver
            }
    
            const response = await fetch(`http${$isHttps ? "s" : ""}://${insrv}:${$port}/register`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            
            if(response.status == 200){
                server.set(insrv)
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
    left: {!$isLogin ? "-320px" : "340px"};
    pointer-events: {!$isLogin ? "auto" : "none"};
    padding: {!$isLogin ? "10px" : "0" };
">
    <div class="title">Sign up for Amity</div>
    <div class="inputs">
        <Textbox onkeydown={(e:any)=>{
            isDnameInvalid = false;
            if(e.key == "Enter") signupProcedure()
        }} isError={isDnameInvalid} maxlength={64} bind:value={dname} width="100%" icon="Rename" placeholder="Display name"></Textbox>
        
        <div class="elements-horiz">
            <Textbox onkeydown={(e:any)=>{
                isUnameInvalid = false;
                if(e.key == "Enter") signupProcedure()
            }} isError={isUnameInvalid} maxlength={32} bind:value={uname} width="100%" icon="User" placeholder="Username"></Textbox>
            <Icon name="AtSign"></Icon>
            <Textbox onkeydown={(e:any)=>{
                isInsrvInvalid = false;
                if(e.key == "Enter") signupProcedure()
            }} isError={isInsrvInvalid} bind:value={insrv} width="100%" placeholder="Server"></Textbox>
        	<Button style={$isHttps ? 0 : 2} action={()=>{isHttps.set(!$isHttps); localStorage.setItem("isDev", "true")}}><Icon name="Code"></Icon></Button>
        </div>
        <Textbox onkeydown={(e:any)=>{
            isFpassInvalid = false;
            if(e.key == "Enter") signupProcedure()
        }} isError={isFpassInvalid} isPassword maxlength={64} bind:value={fpass} width="100%" icon="Lock/Locked" placeholder="Password"></Textbox>
        <Textbox onkeydown={(e:any)=>{
            isRpassInvalid = false;
            if(e.key == "Enter") signupProcedure()
        }} isError={isRpassInvalid} isPassword maxlength={64} bind:value={rpass} width="100%" icon="Lock/Locked" placeholder="Repeat password"></Textbox>
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="Cloud"></Icon> File server <div style="opacity: 0.5;">amycdn.neg-zero.com</div></div>
            <Icon name="Direction/Right"></Icon>
        </Button>
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
        width: 320px;
        height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        transition: 0.25s;
        flex-wrap: 0;
        position: relative;
    }

    .elements-horiz{
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