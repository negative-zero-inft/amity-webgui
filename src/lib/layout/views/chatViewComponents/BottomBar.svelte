<script lang="ts">
	import Icon from "$lib/kit/decor/Icon.svelte";
	import Button from "$lib/kit/gizmos/Button.svelte";
	import Message from "$lib/kit/messages/Message.svelte";
	import Textarea from "$lib/kit/text/Textarea.svelte";
	import { authNumber, isHttps, port, server, user } from "$lib/scripts/globalData";
	import { currentChat } from "lib/scripts/chatViews";
	import { auther } from "lib/scripts/utils";
    import { _ } from "svelte-i18n";

    let defChatElements: HTMLDivElement | null = $state(null);
    let typingChatElements: HTMLDivElement | null = $state(null);
    let msg = $state("");
    
    const sendMessage = async () => {
        try{
            const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/group/${$currentChat.id.id}/messages?totp=${auther($authNumber)}&uid=${$user.id.id}&homeserver=${$user.id.server}`, {
                method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				},
                body: JSON.stringify({
                    content: msg
                })
            })
            console.log(await response)
        }catch(e){
            console.error(e)
        }
        msg = "";
    }

    let isPreview = $state(false);
    let previewButtonEvent: MouseEvent | null = $state(null);

    $effect(()=>{
        if(msg.length == 0){
            isPreview = false;
        }
    })
</script>

<div 
    id="previewWindow"
    class="window"
    style="
        scale: {isPreview ? 1 : 0};
        position: absolute;
        right: {isPreview ? 10 : (36 * 2) + 10}px;
        bottom: {isPreview ? 10 + 56 : 10}px;
        transition: 0.25s;
        border-radius: 25px 25px 15px 25px;
    "
>
    <Message
        isSender
        content={msg}
    />
</div>
<div class="bottomBar">
    <Button>
        <Icon name="Plus"/>
    </Button>
    <Textarea 
        onkeydown={(e: KeyboardEvent) => {
            if (e.key == "Enter") {
                if($user?.settings?.shiftSend) {
                    if(e.shiftKey){
                        e.preventDefault();
                        sendMessage();
                        return
                    }
                }else{
                    if(!e.shiftKey){
                        e.preventDefault();
                        sendMessage();
                        return
                    }
                }
            }
        }}
        width="100%"
        height={msg.split("\n").length > 1 ? 20 + msg.split("\n").length * 15 + "px" : "36px"}
        style="
            max-height: calc(100vh - 20px);
            backdrop-filter: blur(40px);
        "
        icon={msg.split("\n").length <= 1 ? "Chat" : ""} 
        bind:value={msg}
        bgc="#00000080"
        placeholder={$_("chat.chatboxPlaceholder")}
    />
    <div 
        bind:this={defChatElements}
        id="defChatElements"
        class="elem-horiz"
        style="
            position: {msg.length > 0 ? "absolute" : "relative"};
            right: {msg.length > 0 ? 0 - (defChatElements?.offsetWidth || 0) : 0}px;
            transition: 0.25s;
        "
    >
        <Button>
            <Icon name="Users"/>
        </Button>
        <Button>
            <Icon name="Equalizer"/>
        </Button>
        <Button>
            <Icon name="Terminal"/>
        </Button>
        <Button>
            <Icon name="Location"/>
        </Button>
        <Button>
            <Icon name="GIF"/>
        </Button>
        <Button>
            <Icon name="StickyNotes"/>
        </Button>
        <Button>
            <Icon name="Smile"/>
        </Button>
        <Button>
            <Icon name="Microphone"/>
        </Button>
    </div>
    <div 
        bind:this={typingChatElements}
        id="typingChatElements"
        class="elem-horiz"
        style="
            position: {msg.length > 0 ? "relative" : "absolute"};
            right: {msg.length > 0 ? 0 : 0 - (typingChatElements?.offsetWidth || 0)}px;
            transition: 0.25s;
        "
    >
        <Button
            tooltip={$_("chat.previewMessage")}
            width="36px"
            style={isPreview ? "selected" : "default"}
            action={(e: MouseEvent) => {
                isPreview = !isPreview;
                previewButtonEvent = e;
            }}
        >
            <Icon name="Eye"/>
        </Button>
        <Button>
            <Icon name="Smile"/>
        </Button>
        <Button
            style="accent"
            action={sendMessage}
        >
            <Icon name="Send"/>
        </Button>
    </div>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .bottomBar{
        width: 100%;
        height: 56px;
        box-sizing: border-box;
        display: flex;
        gap: v.$spacing-def;
        padding: v.$spacing-def;
        flex-direction: row;
        align-items: flex-end;
        position: relative;
    }
</style>