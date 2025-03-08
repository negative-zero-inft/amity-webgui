<script lang="ts">
    import { _ } from "svelte-i18n";
    import amy from "$lib/amy.svg"
	import Icon from "$lib/kit/decor/Icon.svelte";
</script>

<div class="emptyView">
	<img alt="Amy" class="amy" src={amy}/>
    <Icon size={32} name="Chat"/>
    {$_("chat.emptyView")}
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .emptyView{
		background: radial-gradient(#300000, #000000);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        gap: 20px;
    }

    .amy{
		position:fixed;
		width: 780px;
		opacity: 0.25;
		right: -200px;
		bottom: -200px;
        z-index: 0;
        // todo: make amy not on top of everything else
	}
</style>