<script lang="ts">
    import Button from '$lib/kit/gizmos/Button.svelte';
    import Icon from '$lib/kit/decor/Icon.svelte';
    import AvatarStack from '$lib/kit/decor/AvatarStack.svelte';

    let isHover = $state(false);
    let isActive = $state(false);
</script>

<Button 
    hoverAction={()=>{
        isHover = true;
    }}
    leaveAction={()=>{
        isHover = false;
    }}
    mdownAction={()=>{
        isActive = true;
    }}
    mupAction={()=>{
        isActive = false;
    }}
>
    <Icon name="Camera/Video" />
    Stories
    <AvatarStack isHover={isHover} isActive={isActive} />
</Button>