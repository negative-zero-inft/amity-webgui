<script lang="ts">
    import { user, server } from "$lib/scripts/globalData";
    import MsgCluster from "$lib/kit/messages/MsgCluster.svelte";
	import { currentChat } from "$lib/scripts/chatViews";

    const exampleMessages = [
        [
            {
                id: {
                    id: $user?.id.id,
                    server: $server
                }
            },
            {
                date: new Date(),
                content: "testoid 2"
            },
            {
                date: new Date(),
                content: "testoid"
            },

        ],
        [
            {
                id: {
                    id: "ZSTXMJ16VQ2OG2AIQF49YZZ8",
                    server: $server
                }
            },
            {
                date: new Date(),
                content: "testoid 2"
            },
            {
                date: new Date(),
                content: "testoid"
            },
            {
                date: new Date(),
                content: "testoid"
            },
            {
                date: new Date(),
                content: "# testoid"
            }
        ]
    ]   
</script>

<div class="view">
    <div class="messageList">
        {#each exampleMessages as cluster}
            <MsgCluster
                isGroup={$currentChat.type != "dm"}
                author={cluster[0].id}
                messages={cluster.slice(1).map((m: any) => m.content)}
            />
        {/each}
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