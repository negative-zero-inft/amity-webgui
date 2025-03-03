<script lang="ts">
	import Avatar from "$lib/kit/decor/Avatar.svelte";
	import Icon from "$lib/kit/decor/Icon.svelte";
	import Button from "$lib/kit/gizmos/Button.svelte";
	import Textbox from "$lib/kit/text/Textbox.svelte";
    import { currentChat } from "$lib/scripts/chatViews";
    import { _ } from "svelte-i18n";
</script>

<div class="topBar">
    <div 
        id="chatTag" 
        class="elem-horiz"
    >
        {#if $currentChat.type == "channel"}
            <div class="iconContainer">
                <Icon name="Chat"/>
            </div>
        {:else}
            <!-- temp -->
            <Avatar pfpLink={"/amity.png"}/>
        {/if}
        <div class="aboutChat">
            <div class="name">
                {$currentChat.name}
            </div>
            <div class="subtitle">
                {
                    $currentChat.type == "dm" || $currentChat.type == "channel" ? "todo" : 
                    $currentChat.memberList.length + " " + (
                        $currentChat.memberList.length == 1 ? $_("chat.member") : $_("chat.members")
                    )
                }
            </div>
        </div>
    </div>
    <div 
        class="elem-horiz"
    >
        <Button>
            <Icon name='Pin/Angled'/>
        </Button>
        <Textbox placeholder={$_("chat.searchbox")}/>
        <Button>
            <Icon name='Hamburger'/>
        </Button>
    </div>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .subtitle{
        opacity: 0.5;
    }

    .aboutChat{
        display: flex;
        flex-direction: column;
        height: 36px;
        justify-content: space-between;
    }

    .topBar{
        width: 100%;
        height: 56px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: v.$spacing-def;
        box-sizing: border-box;
    }
</style>