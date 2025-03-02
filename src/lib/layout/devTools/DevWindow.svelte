<script lang="ts">
	import Label from "$lib/kit/decor/Label.svelte";
	import Textbox from "$lib/kit/text/Textbox.svelte";
    import { locale } from "$lib/scripts/globalData";
    import { locale as ilocale, locales } from "svelte-i18n"; 
    
    let listLanguages = $state($locales);

    let localeInput = $state($locale);

    function onclick(e: any) {
        locale.set(e.target.value)
        ilocale.set(e.target.value)
    }
</script>

<div class="window">
    <Label icon="Translate" label="Lingo switcher">
        <!-- <Textbox 
            onkeydown={(e: KeyboardEvent)=>{
                if(e.key == "Enter"){
                    locale.set(localeInput);
                    ilocale.set(localeInput);
                }
            }}
            bind:value={localeInput}
            placeholder="locale"
        /> -->
        <select name="cars" {onclick}>
            {#each listLanguages as lang}
            <option value={lang}>{lang}</option>
            {/each}
          </select>
    </Label>
</div>

<style lang="scss">
    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    .window{
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
</style>