<script lang="ts">
	import Avatar from "$lib/kit/Avatar.svelte";

	import Button from "$lib/kit/Button.svelte";
	import Icon from "$lib/kit/Icon.svelte";

    let{
        banner = "src/lib/Jump.png",
        isExp,
        username = "Alex",
        tag = "nrd@amity.neg-zero.com",
        avatar = "src/lib/amity.png"
    } = $props()

</script>

<div class="barTop">
    <img src={banner} class="banner"/>
    <div class="top">
        <Button action={() =>{
            isExp.set(false);
        }}><Icon name="Direction/Left"></Icon></Button>
        <Button><Icon name="Bell"></Icon></Button>
    </div>
    <div class="bottom">
        <Avatar pfpLink={avatar}></Avatar>
        <div class="username">
            <b>
                {username}
            </b>
            <div>
                {tag}
            </div>
        </div>
        <Button><Icon name="Share/Alt"></Icon></Button>
        <Button><Icon name="Switch"></Icon></Button>
    </div>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use '$lib/style/variables.scss' as v;

    .username{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
    }
    .bottom{
        display: flex;
        gap: v.$spacing-def;
    }
    .top{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .banner{
        position: absolute;
        left: 0;
        top: 0;
        width: 320px;
        height: 150px;
        z-index: -1;
    }
    .barTop{
        height: 150px;
        width: 320px;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        flex-direction: column;
        justify-content: space-between;
    }

</style>