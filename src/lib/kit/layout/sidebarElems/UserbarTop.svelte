<script lang="ts">

	import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";

    let{
        banner = "src/lib/Jump.png",
        isExp
    } = $props()

</script>

<div class="barTop">
    <img src={banner} class="banner"/>
    <div class="top">
        <Button action={() =>{
            isExp.set(false);
        }}><Icon name="Direction/Left"></Icon></Button>
    </div>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use '$lib/style/variables.scss' as v;

    .top{

    }

    .banner{
        position: absolute;
        left: 0;
        top: 0;
        width: 320px;
        height: 150px;
        z-index: 0;
    }
    .barTop{
        height: 150px;
        width: 320px;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
    }

</style>