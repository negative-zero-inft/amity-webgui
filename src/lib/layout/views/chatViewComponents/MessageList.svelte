<script lang="ts">
    import MsgCluster from "$lib/kit/messages/MsgCluster.svelte";
	import { currentChat } from "$lib/scripts/chatViews";
	import { authNumber, isHttps, port, server, user } from "$lib/scripts/globalData";
	import Button from "lib/kit/gizmos/Button.svelte";
	import ChatEntry from "lib/kit/gizmos/ChatEntry.svelte";
    import { auther } from "lib/scripts/utils";
    import { writable } from "svelte/store";
    import { messages as cachedMessages } from "lib/scripts/cache";

    let isLoading = $state(false)

    const messages = writable<any[]>([]);
    const fetchMessages = async (chat: typeof $currentChat) =>{
        isLoading = true
        if($cachedMessages.find(e=>{
            if(e.id.id != $currentChat.id.id) return 
            if(e.id.server != $currentChat.id.server) return
            return true
        })){
            const msglist = $cachedMessages.find(e=>{
                if(e.id.id != $currentChat.id.id) return
                if(e.id.server != $currentChat.id.server) return
                return e.messages
            })
            if(!msglist) return
            messages.set(msglist.messages)
            isLoading = false
        }else{
            console.log("a")
        }
        try{
            const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/group/${chat.id.id}/messages?totp=${auther($authNumber)}&uid=${$user.id.id}&homeserver=${$user.id.server}`, {
                method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				}
            })
            messages.set(await response.json())
            if(!$cachedMessages.find(e=>{
                if(e.id.id != $currentChat.id.id) return
                if(e.id.server != $currentChat.id.server) return
                return true
            })){
                $cachedMessages.push({
                    id: $currentChat.id,
                    messages: $messages
                })
            }
            isLoading = false
        }catch(e){
            isLoading = false
            console.error(e)
        }
    }

    currentChat.subscribe((e) =>{
        fetchMessages(e)
    })
</script>

<div class="view">
    <div class="messageList">
        {#if isLoading}
            <div style="
                display: flex;
                flex-align: center;
                align-items: center;
                justify-content: center;
                position: relative;
                height: 100%;
                width: 100%;
            ">
                <Button isWaiting>
                    a
                </Button>
            </div>
        {:else}
            {#each $messages as cluster}
                <MsgCluster
                    isGroup={$currentChat.type != "dm"}
                    author={cluster.author}
                    messages={cluster.messages.map((m: any) => m)}
                />
            {/each}
        {/if}
    </div>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .messageList{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding: v.$spacing-def;
    }
    .view{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
    }
</style>