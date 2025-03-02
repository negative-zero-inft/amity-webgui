<script lang="ts">
	import Icon from "$lib/kit/decor/Icon.svelte";
	import Button from "$lib/kit/gizmos/Button.svelte";
    import { _ } from 'svelte-i18n';

</script>

<div class="userbarBottom">
    <Button
        scaleHover={1.05}
        scaleClick={0.95}    
        alignment="flex-start"
        width="100%"
    >
        <Icon name="Settings"/>
        {$_("sidebar.userbar.settings")}
    </Button>
</div>

<style lang="scss">

    @use '$lib/style/variables.scss' as v;
    @use '$lib/style/colors.scss' as c;

    .userbarBottom{
        height: 36px;
        padding: v.$spacing-def;
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 300px;
        background-color: c.$bg;
        outline: 1px solid c.$text-25;
    }
</style>