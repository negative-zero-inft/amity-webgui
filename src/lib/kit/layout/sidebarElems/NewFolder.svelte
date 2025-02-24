<script lang="ts">
	import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";
    import Textbox from "$lib/kit/Textbox.svelte";
    import { isNewFolder, newFolderE } from "$lib/scripts/chatViews";
    import { isHttps, port, server, token, user } from "$lib/scripts/globalData";

    let name: string | undefined = $state();
    let icon: string | undefined = $state();
    
    let isError:boolean;
    let errorValue:string;

    let icons:string[];
    $effect(() => {
        try {
            // Import.meta.glob returns a module with keys that are the file paths, and values that are the imported modules.
            // We only want the keys (file paths)
            const modules = import.meta.glob('/static/icons/**/*'); // Adjust the path as needed (e.g., './components/*.svelte')
            icons = Object.keys(modules);
            console.log(icons)
        } catch (error) {
            console.error('Error listing files:', error);
        }
    });

    const getUser = async () =>{
		try{
			const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}user/me?token=${$token}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				}
			})
			user.set(JSON.parse(await response.text()))
		}catch(e){
			console.log(e)
			window.location.replace("/login")
			token.set(null)
			return
		}
	}

    const makeFolder = async () =>{
        if(!name || !icon){
            isError = true
            errorValue = "Please fill all spaces"
        }
        try{
            const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/user/me/chatfolders/add?token=${$token}`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    icon: icon
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            console.log(response)
            getUser()
        }catch(e){
            console.log(e)
        }
    }
</script>

<div class="window" style="
    scale: {$isNewFolder ? 1 : 0};
    pointer-events: {$isNewFolder ? "auto" : "none"};
    transform: translateY({$isNewFolder ? "0" : "300px"});
    top: {$isNewFolder ? "88px" : "0px" };
    left: {$isNewFolder ? "10px" : `${$newFolderE?.clientX - 150}px`};
">
    <Textbox bind:value={name} width="100%" icon="Rename" placeholder="Name"></Textbox>
    <Textbox bind:value={icon} width="100%" icon="Image" placeholder="Icon"></Textbox>
    <Button action={makeFolder} scaleClick={0.95} scaleHover={1.05} style={1} width="100%"><Icon name="Plus"></Icon>Add</Button>
</div>

<style lang="scss">
    
    @use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;
    
    .window{
        transition: 0.25s;
        position: absolute;
        top: 88px;
        width: 280px;
        z-index: 2137;
        gap: v.$spacing-def;
    }
</style>