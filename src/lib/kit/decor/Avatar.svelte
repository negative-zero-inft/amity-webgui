<script lang="ts">
	let { 
		pfpLink = 'amity.png',  
		size = 36
	} = $props();
</script>

<img 
	
	src={pfpLink} 
	alt="pfp" 
	style="--w: {size}px;" 
/>

<style lang="scss">
	@use '$lib/style/colors.scss' as c;
	@use '$lib/style/variables.scss' as v;

	img {
		width: var(--w, v.$elem-height);
		height: var(--w, v.$elem-height);
		border-radius: 50%;
		flex-shrink: 0;
	}
</style>
