<!-- SOMEONE FINISH THIS -->

<script lang="ts">
	import Icon from './Icon.svelte';

	let { timestamp = Date.now() } = $props();

	let datenow = $state(Date.now());
	setInterval(() => {
		datenow = Date.now();
	}, 1000);
    const getTime = (timestamp, datenow) =>{
        const diff = datenow - timestamp
        const second = diff / 1000
        const seconds = second % 60
        const minute = second / 60
        const hour = minute / 60

        const minutesFinal = Math.floor(minute)
        const secondsFinal = Math.floor(seconds)

        return `${minutesFinal.toString().padStart(2, "0")}:${secondsFinal.toString().padStart(2, "0")}`
    }
</script>

<div class="recordingBar">
    {getTime(timestamp, datenow)}
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.recordingBar {
		display: flex;
		padding-left: v.$spacing-def;
		justify-content: center;
		align-content: flex-start;
		gap: v.$spacing-def;
		border: solid;
		border-color: c.$text-25;
		border-width: 1px;
		border-radius: v.$corner-elem;
		color: c.$text;
		height: v.$elem-height;
		width: 100%;
		background: none;
		box-sizing: border-box;
		@include v.standard-text();
		transition: 0.25s;
	}
</style>
