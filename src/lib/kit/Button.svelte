<script lang="ts">
    let {style = 0, width = "max-content", action = () => {}, children, id = ""} = $props()
</script>

<button id={id} class="bv{style}" style="--w: {width}" 
    onclick={(e) => {
        action(e);
    }}
>{@render children?.()}</button>

<style lang="scss">

    @use "$lib/style/variables.scss" as v;
    @use "$lib/style/colors.scss" as c;

    button{
        white-space: nowrap;
        flex-direction: row !important;
    }

    .bv3{
        background-color: c.$accent;
        color: c.$text;
        border-radius: v.$corner-elem;
        height: v.$chip-height;
        border: none;
        display: flex;
        align-items: center;
        gap: v.$spacing-def;
        padding: v.$spacing-chip;
        @include v.standard-text();
    }
    
    .bv3:hover{
        background-color: c.$accent-80;
    }

    .bv3:active{
        background-color: c.$accent-40;
    }

    .bv1{
        background-color: c.$accent;
        color: c.$text;
        border-radius: v.$corner-elem;
        height: v.$elem-height;
        border: none;
        display: flex;
        align-items: center;
        gap: v.$spacing-def;
        padding: v.$spacing-def;
        @include v.standard-text();
    }
    
    .bv1:hover{
        background-color: c.$accent-80;
    }

    .bv1:active{
        background-color: c.$accent-40;
    }
    
    .bv0{
        background-color: c.$clickable;
        color: c.$text;
        border-radius: v.$corner-elem;
        height: v.$elem-height;
        border: none;
        display: flex;
        align-items: center;
        gap: v.$spacing-def;
        padding: v.$spacing-def;
        @include v.standard-text();
    }

    .bv0:hover{
        background-color: c.$hover;
    }

    .bv0:active{
        background-color: c.$clicked;
    }

    .bv2{
        background-color: c.$clickable;
        color: c.$text;
        border-radius: v.$corner-elem;
        height: v.$chip-height;
        border: none;
        display: flex;
        align-items: center;
        gap: v.$spacing-def;
        padding: v.$spacing-chip;
        @include v.standard-text();
    }

    .bv2:hover{
        background-color: c.$hover;
    }

    .bv2:active{
        background-color: c.$clicked;
    }
</style>