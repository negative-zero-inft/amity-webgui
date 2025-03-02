<script lang="ts">  
	import Button from '$lib/kit/Button.svelte';
	import Label from '$lib/kit/Label.svelte';
	import Icon from '$lib/kit/Icon.svelte';
	import Textbox from '$lib/kit/Textbox.svelte';
	import Textarea from '$lib/kit/Textarea.svelte';

    let isEvil = $state<boolean>(false);
</script>

<div class="devView">

    <Label icon="Rename" label="Text inputs"></Label>
    <div class="elem-vert">
        <Textbox
            onkeydown={(e: KeyboardEvent)=>{
                if(e.key === 'Enter'){
                    isEvil = true;
                    setTimeout(()=>{
                        isEvil = false;
                    }, 1000);
                    e.preventDefault() 
                }}
            }
            placeholder="Textbox"
            isError={isEvil}
        />
        <Textarea 
            onkeydown={(e: KeyboardEvent)=>{
                if(e.key === 'Enter'){
                    isEvil = true;
                    setTimeout(()=>{
                        isEvil = false;
                    }, 1000);
                    e.preventDefault() 
                }
            }}
            placeholder="Textarea" 
            height="100px" 
            isError={isEvil}
        />
        <Textbox
            icon="Rename"
            onkeydown={(e: KeyboardEvent)=>{
                if(e.key === 'Enter'){
                    isEvil = true;
                    setTimeout(()=>{
                        isEvil = false;
                    }, 1000);
                    e.preventDefault() 
                }}
            }
            placeholder="Textbox"
            isError={isEvil}
        />
        <Textarea 
            icon="Rename"
            onkeydown={(e: KeyboardEvent)=>{
                if(e.key === 'Enter'){
                    isEvil = true;
                    setTimeout(()=>{
                        isEvil = false;
                    }, 1000);
                    e.preventDefault() 
                }
            }}
            placeholder="Textarea" 
            height="100px" 
            isError={isEvil}
        />
    </div>
    <Label icon="Button" label="Buttons"></Label>
    <div class="elem-horiz">
        <Button style="default"><Icon name="Button" /> Test</Button>
        <Button style="accent"><Icon name="Button" /> Test</Button>
        <Button style="destructive"><Icon name="Button" /> Test</Button>
        <Button style="selected"><Icon name="Button" /> Test</Button>
    </div>
    <div class="elem-horiz">
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