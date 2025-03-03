<script lang="ts">
	import Icon from "$lib/kit/decor/Icon.svelte";
	import Button from "$lib/kit/gizmos/Button.svelte";
	import Textarea from "$lib/kit/text/Textarea.svelte";
    import { _ } from "svelte-i18n";

</script>

<div class="bottomBar">
    <Button>
        <Icon name="Plus"/>
    </Button>
    <Textarea width="100%" icon="Chat" placeholder={$_("chat.chatboxPlaceholder")}/>
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
    }
</style>