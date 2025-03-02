<script lang="ts">  
	import Button from '$lib/kit/Button.svelte';
	import Label from '$lib/kit/Label.svelte';
	import Icon from '$lib/kit/Icon.svelte';
</script>

<div class="devView">

    <Label icon="Button" label="Buttons"></Label>
    <div class="elements-horiz">
        <Button style="default"><Icon name="Button" /> Test</Button>
        <Button style="accent"><Icon name="Button" /> Test</Button>
        <Button style="destructive"><Icon name="Button" /> Test</Button>
        <Button style="selected"><Icon name="Button" /> Test</Button>
    </div>
    <div class="elements-horiz">
        <Button style="default" isChip><Icon name="Button" /> Test</Button>
        <Button style="accent" isChip><Icon name="Button" /> Test</Button>
        <Button style="destructive" isChip><Icon name="Button" /> Test</Button>
        <Button style="selected" isChip><Icon name="Button" /> Test</Button>
    </div>
</div>

<style lang="scss"> 
    .devView {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }
</style>