<script lang="ts">
    import Button from '$lib/kit/Button.svelte';
	import Icon from '$lib/kit/Icon.svelte';
    import { isHttps, port, server, token, user } from "$lib/scripts/globalData";
	import { windowClickEvent, isMoreButtonCtxMenu, moreButtonClickEvent, folder } from '$lib/scripts/chatViews';
	import Textbox from '$lib/kit/Textbox.svelte';
	import Label from '$lib/kit/Label.svelte';

    let{

    } = $props()

    let icon = $state($folder.icon)
    let name = $state($folder.name)
    folder.subscribe(()=>{
        icon = $folder.icon
        name = $folder.name
    })
    let isIconPicker = $state(true)

	let ctxMenu: HTMLElement | undefined = $state();
	let isCtxEdit: boolean = $state(false)

    let ctxDef: HTMLElement | undefined = $state();
    let ctxEdit: HTMLElement | undefined = $state();
    let iconPicker: HTMLElement | undefined = $state();

    let wasActive: boolean = $state(true)

    let icons:string[] | undefined = $state();
    try {
        const modules = import.meta.glob('/static/icons/**/*');
        icons = Object.keys(modules);
    } catch (error) {
        console.error('Error listing files:', error);
    }

    isMoreButtonCtxMenu.subscribe(()=>{
        isIconPicker = false
        isCtxEdit = false
    })

    windowClickEvent.subscribe((e) => {
		if (
			e?.clientX < ctxMenu?.offsetLeft || 
			e?.clientX > ctxMenu?.offsetLeft + ctxMenu?.offsetWidth ||
			e?.clientY < ctxMenu?.offsetTop || 
			e?.clientY > ctxMenu?.offsetTop + ctxMenu?.offsetHeight
		) {
            if($isMoreButtonCtxMenu){
                isIconPicker = false
                isCtxEdit = false
                $isMoreButtonCtxMenu = false;
            }
		}
	});
    

    const getUser = async () =>{
		try{
			const response = await fetch(`http${$isHttps ? "s" : ""}://${$server}:${$port}/user/me?token=${$token}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				}
			})
			user.set(JSON.parse(await response.text()))
		}catch(e){
			console.log(e)
			// window.location.replace("/login")
			// token.set(null)
			return
		}
	}
</script>

<div
    bind:this={ctxMenu}
    id="ctxMenu"
    class="window"
    style="
    position: absolute;
    left: calc({$moreButtonClickEvent?.clientX}px - {ctxMenu?.clientWidth / 2}px);
    scale: {$isMoreButtonCtxMenu ? 1 : 0};
    top: {$isMoreButtonCtxMenu ? 56 : -28}px;
    z-index: 12831928471983412381931723071;
    width: 240px;
    height: {ctxDef?.clientHeight}px;
    padding: 0;
"
>
    <div bind:this={ctxDef} class="defaultCtxMenuView" style="
        left: {isCtxEdit ? -240 : 0}px
    ">
        <Button
            action={() => {
                isCtxEdit = true
            }}
            scaleClick={0.95}
            scaleHover={1.05}
            alignment="space-between"
            width="100%"
        >
            <div class="elem-horiz"><Icon name="Search"></Icon> Search Amity</div>
            <Icon name="Direction/Right"></Icon>
        </Button>
        <Button
            action={() => {
                isCtxEdit = true
            }}
            scaleClick={0.95}
            scaleHover={1.05}
            alignment="space-between"
            width="100%"
        >
            <div class="elem-horiz"><Icon name="Plus"></Icon> Create...</div>
            <Icon name="Direction/Right"></Icon>
        </Button>
    </div>
</div>

<style lang="scss">
    @use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;
    .iconList{
        width: 305px;
        height: 320px;
        padding: v.$spacing-def;
        padding-top: 56px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 13px;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: c.$bg;
    }

    .iconPickerTop {
        top: 0;
        left: 0;
        width: 300px;
		box-sizing: border-box;
		flex-shrink: 0;
		background: linear-gradient(to bottom, #000000ff 50%, #00000000);
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		position: absolute;
        padding: v.$spacing-def;
        z-index: 21374;
	}

    .iconPicker{
        top: 0;
        width: 280px;
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        position: absolute;
        transition: 0.25s;
    }


    .elem-horiz {
		display: flex;
		gap: v.$spacing-def;
		align-items: center;
	}
    .menuTop{
        display: flex;
        gap: v.$spacing-def;
    }
    .editCtxMenuView{
		width: 220px;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		position: absolute;
		transition: 0.25s;
        padding: v.$spacing-def;
	}
	.defaultCtxMenuView{
		width: 220px;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		position: absolute;
		transition: 0.25s;
        padding: v.$spacing-def;
	}
</style>