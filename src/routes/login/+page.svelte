<script lang="ts">
</script>

<div class="settingWindow">Welcome to Amity!</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.settingWindow {
		padding: v.$spacing-def;
		background-color: c.$bg;
		border-radius: v.$corner-window;
		border: solid;
		border-color: c.$text-25;
		width: 40vw;
		height: 60vh;
	}
</style>
