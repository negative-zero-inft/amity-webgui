<script lang="ts">  
	import Button from '$lib/kit/gizmos/Button.svelte';
	import Label from '$lib/kit/decor/Label.svelte';
	import Icon from '$lib/kit/decor/Icon.svelte';
	import Textbox from '$lib/kit/text/Textbox.svelte';
	import Textarea from '$lib/kit/text/Textarea.svelte';
    import Avatar from '$lib/kit/decor/Avatar.svelte';
	import Emoji from '$lib/kit/decor/Emoji.svelte';
	import StoriesButton from '$lib/kit/gizmos/StoriesButton.svelte';
	import ChatEntry from '$lib/kit/gizmos/ChatEntry.svelte';
	import { server, user } from '$lib/scripts/globalData';
	import Switch from '$lib/kit/gizmos/Switch.svelte';
	import MsgCluster from '$lib/kit/messages/MsgCluster.svelte';
    let isEvil = $state<boolean>(false);
    let switchState = $state<boolean>(false);
    import { isHttps, port, token } from '$lib/scripts/globalData';
    import { getUser } from '$lib/scripts/requests';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    const clearLocalStorage = ()=>{
		localStorage.removeItem('token');
		localStorage.removeItem('server');
		localStorage.removeItem('isDev');
	}
    
    $effect(() => {
		if (!browser) return;
		
		if (localStorage.getItem('isDev') == 'true') isHttps.set(false);

		const storedToken = localStorage.getItem('token');

		if (!storedToken) {
			clearLocalStorage()
			goto('/login', { replaceState: true });
			return;
		}

		token.set(storedToken);

		if (localStorage.getItem('server')) {
			server.set(localStorage.getItem('server') || '');
		}

		try{
			getUser($isHttps, $server, $port, ($token as string))
		}catch(e){
			clearLocalStorage()
			token.set(null);
			goto('/login', { replaceState: true });
		}
	});
    const exampleMessages = [
        [
            {
                id: {
                    id: "ZSTXMJ16VQ2OG2AIQF49YZZ8",
                    server: $server
                }
            },
            {
                date: new Date(),
                content: "testoid 2"
            },
            {
                date: new Date(),
                content: "testoid"
            },

        ],
        [
            {
                id: {
                    id: "ZSTXMJ16VQ2OG2AIQF49YZZ8",
                    server: $server
                }
            },
            {
                date: new Date(),
                content: "testoid 2"
            },
            {
                date: new Date(),
                content: "testoid"
            },
            {
                date: new Date(),
                content: "testoid"
            },
            {
                date: new Date(),
                content: "# testoid"
            }
        ]
    ]
</script>

<div class="devView">

    <Label icon="Chat" label="Messages"/>
    {#each exampleMessages as cluster}
        <MsgCluster
            author={cluster[0].id}
            messages={cluster.slice(1).map((m: any) => m.content)}
        />
    {/each}
    <Label icon="Switch" label="Switch"/>
    <Switch isOn={switchState} onToggle={()=>{switchState = !switchState}}/>
    <Label icon="Chat" label="Chat entry"/>
    <ChatEntry data={
        {
            id: {
                id: "8PAR4VVZB456DN22WFCG6729",
                server: $server
            }
        }
    }/>
    <ChatEntry 
        data={
            {
                id: {
                    id: "8PAR4VVZB456DN22WFCG6729",
                    server: $server
                }
            }
        }
        isSelected
    />
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