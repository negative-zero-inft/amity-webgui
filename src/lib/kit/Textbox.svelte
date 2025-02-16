<script lang="ts">
	import Icon from "./Icon.svelte";

    let { width = "200px", icon = null, placeholder = "placeholder"} = $props();

    let padding: number = $state<number>(10);

    if(icon){
        padding = 36;
    }
</script>

<div class="wrapper" style="--w: {width}">
    {#if icon}
        <span class="icon" >
            <Icon name={icon}/>
        </span>
    {/if}
    <input type="text" placeholder={placeholder} style="--w: {width}; --icon: {icon}; --padding: {padding}px"/>
</div>
<style lang="scss">
    
    @use "$lib/style/variables.scss" as v;
    @use "$lib/style/colors.scss" as c;

    .icon {
        width: 16px;
        height: 16px !important;
        left: 10px;
        top: 10px;
        position: absolute;
        cursor: text;
    }

    input {
        display: flex;
        padding-left: var(--padding);
        justify-content: center;
        align-content: center;
        gap: v.$spacing-def;
        border: solid;
        border-color: c.$text-25;
        border-width: 1px;
        border-radius: v.$corner-elem;
        color: c.$text;
        height: v.$elem-height;
        width: var(--w);
        background: none;
        box-sizing: border-box;
        @include v.standard-text();
    }

    .wrapper{
        position: relative;
        width: var(--w);
        height: 36px;
        display: flex;
    }

    input:focus{
        border: solid;
        border-width: 2px;
        border-color: c.$text-50;
        outline: none;
    }
</style>