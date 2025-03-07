<script lang="ts">
    import { isError, errorValue, view } from "$lib/scripts/newGCWritables";
    import { isNewGroup } from "$lib/scripts/chatViews";
    import Icon from "$lib/kit/decor/Icon.svelte";
    import { newGCE } from "$lib/scripts/newGCWritables";
	import DefaultView from "./newGC/DefaultView.svelte";

    let windowRef: HTMLElement | null = $state(null);
    let windowHeight: number = $state(0);
    $effect(()=>{
        switch($view){
            case "default":
                windowHeight = defaultHeight;
                break;
            default:
                windowHeight = 400;
        }
    })
    
    let defaultHeight: number = $state(0);
    let defaultWidth: number = $state(0);
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
            left: {$isNewGroup ? "calc(50vw - 170px)" : (320 / 2) - 36 + "px"};
            top: {$isNewGroup ? `calc(50vh - ${windowHeight / 2}px)` : ($newGCE?.y - (windowHeight / 2)) + "px"};
            height: {$view == "default" ? defaultHeight : defaultHeight}px;
            width: {$view == "default" ? defaultWidth : defaultWidth}px;
        "
    >
        <DefaultView bind:height={defaultHeight} bind:width={defaultWidth}/>
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