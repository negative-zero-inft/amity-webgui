<script lang="ts">
    import Button from '$lib/kit/gizmos/Button.svelte';
    import Icon from '$lib/kit/decor/Icon.svelte';
    import AvatarStack from '$lib/kit/decor/AvatarStack.svelte';
    import {_} from 'svelte-i18n';

    let isHover = $state(false);
    let isActive = $state(false);

</script>

<Button 
    hoverAction={()=>{
        isHover = true;
        setTimeout(()=>{
            isHover = false;
        }, 1000)
    }}
    leaveAction={()=>{
        isHover = false;
    }}
    mdownAction={()=>{
        isActive = true;
        setTimeout(()=>{
            isActive = false;
        }, 1000)
    }}
    mupAction={()=>{
        isActive = false;
    }}
>
    <Icon name="Camera/Video" />
    {$_("sidebar.storiesButton")}
    <AvatarStack isHover={isHover} isActive={isActive} />
</Button>