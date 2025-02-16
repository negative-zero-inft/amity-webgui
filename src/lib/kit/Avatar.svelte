<script lang="ts">
    let {pfpLink = "src/lib/amity.png"} = $props();
</script>

<img src={pfpLink} alt="pfp"/>

<style lang="scss">
    @use "$lib/style/variables.scss" as v;

    img {
        width: var(--w,v.$elem-height);
        height: var(--h, v.$elem-height);
        border-radius: 50%;
    }
</style>