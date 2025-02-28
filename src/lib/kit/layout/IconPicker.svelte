<script lang="ts">

    import Button from '$lib/kit/Button.svelte';
    import Icon from '$lib/kit/Icon.svelte';
    import Textbox from '$lib/kit/Textbox.svelte';  
    import { iconList } from '$lib/scripts/requests';
    import { isIconPicker, icon } from '$lib/scripts/iconPicker';

    let icons = iconList();
    
    const filteredIcons = () => {
		if (!iconSearchQuery) return icons;
		return icons.filter(icon => icon.toLowerCase().includes(iconSearchQuery.toLowerCase()));
	};

    let iconSearchQuery = $state("");

    isIconPicker.subscribe((value) => {
        if (!value) {
            iconSearchQuery = "";
        }
    });
</script>

<div class="iconPicker" style="left: {$isIconPicker ? '0px' : '320px'}">
    <div class="iconPickerTop">
        <Button action={() => { isIconPicker.set(false); }}><Icon name="Direction/Left"></Icon></Button>
        <Textbox
            bgc="black"
            width="100%"
            icon="Search"
            placeholder="Search icons..."
            bind:value={iconSearchQuery}
        ></Textbox>
    </div>
    <grid class="iconList">
        {#each filteredIcons() as child}
            <Button width="36px; height: 36px;" style={($icon == child.substring(14, child.length - 4)) ? 6 : 4} action={() => {
                icon.set(child.substring(14, child.length - 4));
                isIconPicker.set(false);
            }}><Icon name={child.substring(14, child.length - 4)} /></Button>
        {/each}
    </grid>
</div>

<style lang="scss">
    @use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

    .iconList {
		width: 305px;
		height: 320px;
		padding: v.$spacing-def;
		padding-top: 56px;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(6, 36px);
		grid-template-rows: repeat(6, 36px);
		gap: 13px;
		overflow-y: scroll;
		overflow-x: hidden;
		background-color: c.$bg;
	}

	.iconPickerTop {
		top: 0;
		left: 0;
		width: 302px;
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

	.iconPicker {
		top: 0;
		width: 280px;
		display: flex;
		flex-direction: column;
		gap: v.$spacing-def;
		position: absolute;
		transition: 0.25s;
	}
</style>