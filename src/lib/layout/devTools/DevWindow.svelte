<script lang="ts">
	import Label from "$lib/kit/decor/Label.svelte";
	import Textbox from "$lib/kit/text/Textbox.svelte";
	import { currentFolder, folderClickEvent, ctxFolder, folderCtxMenuView } from "$lib/scripts/chatViews";
    import { locale } from "$lib/scripts/globalData";
    import { locale as ilocale, locales } from "svelte-i18n"; 
    import Icon from "$lib/kit/decor/Icon.svelte";
	import Button from "$lib/kit/gizmos/Button.svelte";
    import { user } from "$lib/scripts/globalData";
    
    let listLanguages = $state($locales);

    function onclick(e: any) {
        locale.set(e.target.value)
        ilocale.set(e.target.value)
    }

    let isVisible = $state(true)
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="window"
    style="display: {isVisible ? 'flex' : 'none'}"
    oncontextmenu={(e)=>{
        e.preventDefault()
        isVisible = false
    }}
>
    <code>LE EPIC DEV WINDOW</code>
    <Label icon="Translate" label="Lingo switcher">
        <select name="cars" {onclick}>
            {#each listLanguages as lang}
                <option value={lang}>{lang}</option>
            {/each}
          </select>
    </Label>
    <Label icon="Code" label="debug thingies">
        <div class="elem-horiz">current folder: <Icon name={$currentFolder.icon}/> {$currentFolder.name}</div>
        <Button width="100%" action={()=>{console.log($user)}} scaleClick={0.95} scaleHover={1.05}>
            <Icon name="User"/>
            view user
        </Button>
        <Button width="100%" action={()=>{console.log($folderClickEvent)}} scaleClick={0.95} scaleHover={1.05}>
            <Icon name="Folder/Default"/>
            view folder click event
        </Button>
        <Button width="100%" action={()=>{console.log($ctxFolder, $folderCtxMenuView, $ctxFolder)}} scaleClick={0.95} scaleHover={1.05}>
            <Icon name="Folder/Default"/>
            view folder ctx menu
        </Button>
    </Label>
</div>

<style lang="scss">
    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    .window{
        gap: v.$spacing-def;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
</style>