<script lang="ts">
	import Icon from "./Icon.svelte";
    let{
        icon = "NegZero",
        label = "label"
    } = $props()
</script>

<div class="label">
    <Icon name={icon}></Icon>
    {label}
</div>

<style lang="scss">

    @use "$lib/style/variables.scss" as v;
    @use "$lib/style/colors.scss" as c;

    .label{
        display: flex;
        align-items: center;
        padding-left: 5px;
        padding-right: 5px;
        gap: v.$spacing-def;
    }
</style>