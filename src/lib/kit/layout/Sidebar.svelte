<script lang="ts">
	import AvatarStack from '../AvatarStack.svelte';
	import Button from '../Button.svelte';
	import ChatEntry from '../ChatEntry.svelte';
	import Icon from '../Icon.svelte';

	let scrollContainer: HTMLDivElement | undefined;
	let startX: number | undefined;

	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		if (!scrollContainer) return; // Guard clause

		const delta = Math.sign(event.deltaY);
		const scrollSpeed = 150;

		scrollContainer.scrollLeft += delta * scrollSpeed;
	}

	function handleTouchStart(_e: TouchEvent) {
		// e.touches.clientX doesn't exist
		// therefore it's actually returns 0
		// still somehow works?
		startX = 0;
	}

	function handleTouchMove(_e: TouchEvent) {
		if (!startX || !scrollContainer) return;

		const currentX = 0;
		const diffX = startX - currentX;

		console.log(currentX);

		scrollContainer.scrollLeft += diffX;
		startX = currentX;
	}
</script>

<div class="sidebar">
	<div class="sidebar-top">
		<div
			class="elements-horiz"
			style="
            width: 300px;
            justify-content: space-between; 
            padding-right: 10px; 
            padding-left: 10px;"
		>
			<Button><Icon name="Hamburger" /></Button>
			<Button>
				<Icon name="Camera/Video" />
				<span class="avatarstack">
					Stories <AvatarStack avatar2={'guitar.png'} avatar3={'src/lib/amity.png'} />
				</span>
			</Button>
			<Button><Icon name="Search" /></Button>
		</div>
		<div class="scroll-horiz" bind:this={scrollContainer} onwheel={handleWheel}>
			<Button style={6}><Icon name="Star" />balls 69</Button>
			<Button style={4}><Icon name="Star" />balls 69</Button>
			<Button style={4}><Icon name="Star" />balls 69</Button>
			<Button style={4}><Icon name="Star" />balls 69</Button>
			<Button style={4}><Icon name="Star" />balls 69</Button>
			<Button style={4}><Icon name="Star" />balls 69</Button>
			<Button style={4}><Icon name="Star" />balls 69</Button>
		</div>
	</div>
	<hr class="separator" />
	<div class="chatEntries">
		<ChatEntry isSelected={true} isFavorite={true}></ChatEntry>
		<ChatEntry isFavorite={true} username={'Harry Bōlz'}></ChatEntry>
		<ChatEntry unreads={69}></ChatEntry>
		<ChatEntry timestamp={Date.now()}></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
		<ChatEntry></ChatEntry>
	</div>
</div>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	.avatarstack {
		display: inline-flex;
		gap: -2px;
		align-items: center;
	}

	.scroll-horiz {
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		overflow: scroll;
		scrollbar-width: none; /* Firefox */
		padding-right: v.$spacing-def;
		padding-left: v.$spacing-def;
		height: v.$chip-height;
		scroll-behavior: smooth;
	}
	.scroll-horiz::-webkit-scrollbar {
		width: none;
	}
	.sidebar-top {
		flex-direction: column;
		display: flex;
		padding: v.$spacing-def;
		padding-right: 0px;
		padding-left: 0px;
		gap: v.$spacing-def;
	}
	.sidebar {
		height: 100%;
		width: 320px;
		display: flex;
		flex-direction: column;
	}

    .avatarstack {
        display: inline-flex;
        gap: -2px;
    }

    .scroll-horiz{
        display: flex;
        flex-direction: row;
        gap: v.$spacing-def;
        scrollbar-width: none;  /* Firefox */
        padding-right: v.$spacing-def;
        padding-left: v.$spacing-def;
        height: v.$chip-height;
        scroll-behavior: smooth;
        overflow-x: scroll;
        overflow-y: visible;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .scroll-horiz::-webkit-scrollbar{
        width: none;
    }
    .sidebar-top{
        
        flex-direction: column;
        display: flex;
        padding: v.$spacing-def;
        padding-right: 0px;
        padding-left: 0px;
        gap: 5px;
        padding-bottom: 5px;
    }
    .sidebar{
        height: 100%;
        width: 320px;
        display: flex;
        flex-direction: column;
    }

    .chatEntries{
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        padding: v.$spacing-def;
        overflow: scroll;
        flex-grow: 1;
    }
</style>
