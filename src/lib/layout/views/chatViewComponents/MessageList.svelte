<script lang="ts">
    import MsgCluster from "$lib/kit/messages/MsgCluster.svelte";
	import { currentChat } from "$lib/scripts/chatViews";
	import { authNumber, isHttps, port, server, user } from "$lib/scripts/globalData";
    import { auther } from "lib/scripts/utils";

    const fetchMessages = async () =>{
        try{
            const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/group/${$currentChat.id.id}/messages?totp=${auther($authNumber)}&uid=${$user.id.id}&homeserver=${$user.id.server}`, {
                method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				}
            })
            console.log(await response)
        }catch(e){
            console.error(e)
        }
    }

    currentChat.subscribe((e) =>{
        fetchMessages()
    })
</script>

<div class="view">
    <div class="messageList">
        temp
        <!-- {#each exampleMessages as cluster}
            <MsgCluster
                isGroup={$currentChat.type != "dm"}
                author={cluster.author}
                messages={cluster.messages.map((m: any) => m)}
            />
        {/each} -->
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