<script lang="ts">
	import Label from "$lib/kit/decor/Label.svelte";
	import Textbox from "$lib/kit/text/Textbox.svelte";
    import { locale } from "$lib/scripts/globalData";
    import { locale as ilocale, locales } from "svelte-i18n"; 
    
    let listLanguages = $state($locales);

    let localeInput = $state($locale);
</script>

<div class="window">
    <Label />
    <Textbox 
        onkeydown={(e: KeyboardEvent)=>{
            if(e.key == "Enter"){
                locale.set(localeInput);
                ilocale.set(localeInput);
            }
        }}
        bind:value={localeInput}
        placeholder="locale"
    />
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