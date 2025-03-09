<script lang="ts">
    import Label from "$lib/kit/decor/Label.svelte";
    import Textbox from "$lib/kit/text/Textbox.svelte";
    import Textarea from "$lib/kit/text/Textarea.svelte";
    import Button from "$lib/kit/gizmos/Button.svelte";
	import Icon from "$lib/kit/decor/Icon.svelte";
    import { _ } from 'svelte-i18n';
    import { errorValue, isError, prevView, view } from "$lib/scripts/newGCWritables";
	import Switch from "$lib/kit/gizmos/Switch.svelte";
    import { channels } from "$lib/scripts/newGCWritables";
	import { isHttps, port, server, token } from "$lib/scripts/globalData";
    import { getUser } from "$lib/scripts/requests";
	import { isNewGroup, isUserBar } from "$lib/scripts/chatViews";
    
    let{
        width = $bindable(0),
        height = $bindable(0)
    } = $props()

    let gcName = $state("");
    let gcDesc = $state("");

    let isChannels = $state(false);
    let isPublic = $state(false);

    let isNameError = $state(false)

    isNewGroup.subscribe((v)=>{
        if(!v){
            view.set("default");
            prevView.set("default");
            gcName = "";
            gcDesc = "";
            isChannels = false;
            isPublic = false;
            channels.set([]);
            isNewGroup.set(false);
            isUserBar.set(false);
            isError.set(false)
        }
    })

    const newGroupProc = async () =>{
        if(gcName.length < 1){
            isNameError = true;
            errorValue.set($_("newGroup.errors.noName"));
            isError.set(true);
            return
        }
        
        try{
            const res = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/group/create?token=${$token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    name: gcName,
                    description: gcDesc,
                    has_channels: isChannels,
                    is_public: isPublic
                })
            })

            if(res.status != 200){
                isError.set(true);
                errorValue.set(await res.text());
            }else{
                getUser($isHttps, $server, $port, $token as string);
                isNewGroup.set(false);
            }
        }catch(e: any){
            isError.set(true);
            errorValue.set(e as string);
        }
    }
</script>

<div 
    class="newGCWindow"
    bind:offsetHeight={height} 
    bind:offsetWidth={width}
    style="
        left: {
            $view == "default" ? 0 : 
            0 - width
        }px;
        transition: 0.25s;
        position: absolute;
    "
>
    <Label icon="Users" label="New group" />
    <Textbox 
        onkeydown={(e: KeyboardEvent)=>{
            if(e.key == "Enter"){
                newGroupProc()
            }
            isNameError = false
        }}
        isError={isNameError}
        minlength={2}
        icon="Rename"
        placeholder={$_("newGroup.namePlaceholder")}
        width="100%" 
        bind:value={gcName}
    />
    <Textarea 
        placeholder={$_("newGroup.descPlaceholder")}
        width="100%" 
        height="72px" 
        bind:value={gcDesc}
    />
    <Button
        action={()=>{
            isPublic = !isPublic
        }}
        alignment="space-between"
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
    >
        <div class="elem-horiz">
            <Icon name={isPublic ? "Lock/Unlocked" : "Lock/Locked"}/>
            {$_("newGroup.privacy.button")}
            <div style="opacity: 0.5;">{isPublic ? $_("newGroup.privacy.public") : $_("newGroup.privacy.private")}</div>
        </div>
        <Switch isOn={!isPublic}/>
    </Button>
    <Button
        action={()=>{
            isChannels = !isChannels
        }}
        alignment="space-between"
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
    >
        <div class="elem-horiz">
            <Icon name="List"/>
            {$_("newGroup.channels.toggleButton")}
            <div style="opacity: 0.5;">{isChannels ? $_("newGroup.channels.enabled") : $_("newGroup.channels.disabled")}</div>
        </div>
        <Switch isOn={isChannels}/>
    </Button>
    {#if isChannels}
        <Button
            action={()=>{
                view.set("channelView")
                prevView.set($view)
            }}
            alignment="space-between"
            scaleClick={0.95}
            scaleHover={1.05}
            width="100%"
        >
            <div class="elem-horiz">
                <Icon name="List"/>
                {$_("newGroup.channels.toggleButton")}
                <div style="opacity: 0.5;">{$channels.length}</div>
            </div>
            <Icon name="Direction/Right"/>
        </Button>
    {/if}
    <Button
        action={newGroupProc}
        scaleClick={0.95}
        scaleHover={1.05}
        width="100%"
        style="accent"
    >
        <Icon name="Plus"/>
        {$_("newGroup.createButton")}
    </Button>
</div>

<style lang="scss">
    @use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

    .newGCWindow{
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        padding: v.$spacing-def;
        width: 280px;
    }
</style>