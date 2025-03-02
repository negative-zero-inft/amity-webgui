<script lang="ts">
    import { _ } from "svelte-i18n";
</script>

<div class="emptySidebar">
    <img src="/billSad.svg" />
    <div class="title" style="font-size: 18px;">{$_("sidebar.noChats")}</div>
    <div class="desc">{$_("sidebar.noChatsDesc")}</div>
</div>

<style lang="scss">
    
    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .desc{
        width: 100%;
        text-align: center;
    }

    .emptySidebar{
        flex-direction: column;
        gap: v.$spacing-def;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>