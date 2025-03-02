<script lang="ts">  
	import Button from '$lib/kit/Button.svelte';
	import Label from '$lib/kit/decor/Label.svelte';
	import Icon from '$lib/kit/decor/Icon.svelte';
	import Textbox from '$lib/kit/text/Textbox.svelte';
	import Textarea from '$lib/kit/text/Textarea.svelte';
    import Avatar from '$lib/kit/decor/Avatar.svelte';
    import AvatarStack from '$lib/kit/decor/AvatarStack.svelte';
	import Emoji from '$lib/kit/decor/Emoji.svelte';
	import StoriesButton from '$lib/kit/StoriesButton.svelte';
    let isEvil = $state<boolean>(false);
    let isHover = $state<boolean>(false);
    let isActive = $state<boolean>(false);

</script>

<div class="devView">

    <Label icon="Eye" label="Hidden content" width="200px">
        surprise
    </Label>
    <Label icon="Image" label="Decorations"></Label>
    <div class="elem-horiz">
        <Icon name="Image" />
        <Avatar/>
        <StoriesButton/>
        <Emoji/>
    </div>
    <Label icon="Rename" label="Text inputs"></Label>
    <div class="elem-vert">
        <div class="elem-horiz">
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
            <div class="elem-horiz">
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
        </div>
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