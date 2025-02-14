<script lang="ts">

    import "$lib/style/global.scss"; 
    import Button from "$lib/kit/Button.svelte";
    import ChatEntry from "$lib/kit/ChatEntry.svelte";
	import Icon from "$lib/kit/Icon.svelte";
</script>

<div class="main">
    <div class="sidebar">
        <div class="sidebar-top">
            <div class="elements-horiz" style="
                width: 300px;
                justify-content: space-between; 
                padding-right: 10px; 
                padding-left: 10px;">
                <Button><Icon name="Hamburger" /></Button>
                <Button><Icon name="Camera/Video"/> Stories</Button>
                <Button><Icon name="Search"/></Button>
            </div>
            <div class="scroll-horiz">
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
                <Button style={2}><Icon name="Star"/>balls 69</Button>
            </div>
        </div>
        <hr class="separator"/>
        <div class="chatEntries">
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
            <ChatEntry></ChatEntry>
            <ChatEntry></ChatEntry>
            <ChatEntry></ChatEntry>
            <ChatEntry></ChatEntry>
        </div>
    </div>
    <hr class="separator"/>
    <div class="view"></div>
</div>

<style lang="scss">
    
    @use "$lib/style/colors.scss" as c;
    @use "$lib/style/variables.scss" as v;

    .chatEntries{
        display: flex;
        flex-direction: column;
        gap: v.$spacing-def;
        padding: v.$spacing-def;
        overflow: scroll;
        flex-grow: 1;
    }

    .scroll-horiz{
        display: flex;
        flex-direction: row;
        gap: v.$spacing-def;
        overflow: scroll;
        scrollbar-width: none;  /* Firefox */
        padding-right: v.$spacing-def;
        padding-left: v.$spacing-def;
        height: v.$chip-height;
    }
    .scroll-horiz::-webkit-scrollbar{
        width: none;
    }
    .elements-horiz{
        display: flex;
        flex-direction: row;
    }
    .sidebar-top{
        
        flex-direction: column;
        display: flex;
        padding: v.$spacing-def;
        padding-right: 0px;
        padding-left: 0px;
        gap: v.$spacing-def;
    }
    .sidebar{
        height: 100%;
        width: 320px;
        display: flex;
        flex-direction: column;
    }
    .view{
        height: 100%;
        width: 100%;
    }
</style>