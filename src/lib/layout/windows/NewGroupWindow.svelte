<script lang="ts">
    import { isError, errorValue, view, prevView, channels } from "$lib/scripts/newGCWritables";
    import { isNewGroup } from "$lib/scripts/chatViews";
    import Icon from "$lib/kit/decor/Icon.svelte";
    import { newGCE } from "$lib/scripts/newGCWritables";
	import DefaultView from "./newGC/DefaultView.svelte";
	import ChannelsView from "./newGC/ChannelsView.svelte";

    let windowRef: HTMLElement | null = $state(null);

    let defaultHeight: number = $state(0);
    let defaultWidth: number = $state(0);
    
    let channelsHeight: number = $state(0);
    let channelsWidth: number = $state(0);
    
    let windowHeight: number = $state(0);
    let windowWidth: number = $state(0);

    $effect(()=>{
        switch($view){
            case "default":
                windowHeight = defaultHeight;
                windowWidth = defaultWidth;
                break;
            case "channelView":
                windowHeight = channelsHeight;
                windowWidth = channelsWidth;
                break;
            default:
                windowHeight = defaultHeight;
                windowWidth = defaultWidth;
                break;
        }
    })
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div 
    id="hhhh"
    class="blurredBg"
    style="
        backdrop-filter: blur({$isNewGroup ? 80 : 0}px);
        pointer-events: {$isNewGroup ? "auto" : "none"};
        background-color: #{$isNewGroup ? "00000040" : "00000000"};
        transition: backdrop-filter 0.25s;
    "
    onclick={(e: MouseEvent)=>{
        if((e.target as HTMLElement).id == "hhhh"){
            view.set("default")
            prevView.set("default")
            isNewGroup.set(false);
        }
    }}
>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div 
        onclick={()=>{isError.set(false)}} 
        style="
            transform: scale({$isError ? "1" : "0"}); 
            opacity: {$isError ? "1" : "0"};
        " 
        class="error"
    >
        <Icon name="Warning"></Icon>{$errorValue}
    </div>
    <div 
        bind:this={windowRef}
        class="window"
        style="
            scale: {$isNewGroup ? 1 : 0};
            padding: 0;
            position: absolute;
            left: {$isNewGroup ? `calc(50vw - ${windowWidth / 2}px)` : (320 / 2) - 36 + "px"};
            top: {$isNewGroup ? `calc(50vh - ${windowHeight / 2}px)` : ($newGCE?.y - (windowHeight / 2)) + "px"};
            height: {windowHeight}px;
            width: {windowWidth}px;
        "
    >
        <DefaultView bind:height={defaultHeight} bind:width={defaultWidth}/>
        <ChannelsView bind:height={channelsHeight} bind:width={channelsWidth}/>
        <!-- copy one of the ones i made already and look inside -->
        <!-- too braindead to figure out shit -->
        <!-- ok but i still couldn't figure out what values to use o see -->
        <!-- ok so make a new component (based off one of these) and in one of them put a channel list, then a component to add a new channel to the list -->
    </div>
</div>

<style lang="scss">
    @use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

    .blurredBg{
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
        // dobra robota
		z-index: 2137198237198237198371293871239817239817239817389217; 
	}

    .error{
		overflow: hidden;
		position: absolute;
		bottom: 10px;
		transition: 0.25s;
		gap: v.$spacing-def;
		font-size: 16px;
		width: 320px;
		height: max-content;
		padding: 10px;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		background-color: c.$accent-t10;
		border-radius: v.$corner-window;
		border: solid;
		border-width: 1px;
		z-index: 2137;
		border-color: c.$accent;
		background-image: repeating-linear-gradient(
			-45deg,
			transparent 15px,
			rgba(255, 0, 0, 0.25) 15px,
			rgba(255, 0, 0, 0.25) 35px,
			transparent 35px,
			transparent 55px /* added this so the pattern repeats seamlessly */
		);
		&:hover{
			background-color: c.$accent-t40;
			scale: 1.1;
		}
		&:active{
			scale: 0.9;
			background-color: c.$accent-t80;
		}
	}
</style>