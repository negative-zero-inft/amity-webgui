<script lang="ts">
    import MsgCluster from "$lib/kit/messages/MsgCluster.svelte";
	import { currentChat } from "$lib/scripts/chatViews";
	import { authNumber, isHttps, port, server, user } from "$lib/scripts/globalData";
	import Button from "lib/kit/gizmos/Button.svelte";
	import ChatEntry from "lib/kit/gizmos/ChatEntry.svelte";
    import { auther } from "lib/scripts/utils";
    import { writable } from "svelte/store";

    let messages = writable<any[]>([]);
    const fetchMessages = async (chat: typeof $currentChat) =>{
        try{
            const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/group/${chat.id.id}/messages?totp=${auther($authNumber)}&uid=${$user.id.id}&homeserver=${$user.id.server}`, {
                method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				}
            })
            messages.set(await response.json())
            console.log($messages)
        }catch(e){
            console.error(e)
        }
    }

    currentChat.subscribe((e) =>{
        messages.set([])
        fetchMessages(e)
        console.log("egg")
    })
</script>

<div class="view">
    <div class="messageList">
        {#if $messages.length == 0}
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