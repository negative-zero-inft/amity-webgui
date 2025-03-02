<script lang="ts">
	import Label from "$lib/kit/decor/Label.svelte";
	import Textbox from "$lib/kit/text/Textbox.svelte";
	import { currentFolder } from "$lib/scripts/chatViews";
    import { locale } from "$lib/scripts/globalData";
    import { locale as ilocale, locales } from "svelte-i18n"; 
    import Icon from "$lib/kit/decor/Icon.svelte";
	import Button from "$lib/kit/gizmos/Button.svelte";
    import { user } from "$lib/scripts/globalData";
    
    let listLanguages = $state($locales);

    let localeInput = $state($locale);

    function onclick(e: any) {
        locale.set(e.target.value)
        ilocale.set(e.target.value)
    }
</script>

<div class="window">
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
            view user (in console)
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