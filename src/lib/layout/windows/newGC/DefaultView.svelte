<script lang="ts">
    import Label from "$lib/kit/decor/Label.svelte";
    import Textbox from "$lib/kit/text/Textbox.svelte";
    import Textarea from "$lib/kit/text/Textarea.svelte";
    import Button from "$lib/kit/gizmos/Button.svelte";
	import Icon from "$lib/kit/decor/Icon.svelte";
    import { _ } from 'svelte-i18n';
    
    let{
        width = $bindable(0),
        height = $bindable(0)
    } = $props()

    let gcName = $state("");
    let gcDesc = $state("");
</script>

<div 
    class="newGCWindow"
    bind:offsetHeight={height} 
    bind:offsetWidth={width}
>
    <Label icon="Users" label="New group" />
    <Textbox 
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