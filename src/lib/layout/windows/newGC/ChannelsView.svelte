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


</script>

<div 
    class="newGCWindow"
    bind:offsetHeight={height} 
    bind:offsetWidth={width}
    style="
        left: {
            $view == "channelView" ? 0 : 
            $prevView == "channelView" ? 0 - width : width
        }px;
        transition: 0.25s;
        position: absolute;
    "
>
    <div class="elem-horiz">
        <Button
            action={() =>{
                prevView.set("default");
                view.set("default");
            }}
        >
            <Icon name="Direction/Left"/>
        </Button>
        TODO
        <!-- h, too organized to even find shit this is what you were supposed to do bruh -->
    </div>
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