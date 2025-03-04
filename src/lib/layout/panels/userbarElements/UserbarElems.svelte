<script lang="ts">
    import Button from "$lib/kit/gizmos/Button.svelte";
    import Icon from "$lib/kit/decor/Icon.svelte";
    import { _ } from 'svelte-i18n';
	import Label from "$lib/kit/decor/Label.svelte";
</script>

<div class="options">
    <Label isOpen label={$_("sidebar.userbar.yourEntries")} icon="User">
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="User"></Icon> {$_("sidebar.userbar.profileEntry")}</div>
            <Icon name="Direction/Right"></Icon></Button
        >
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="Users"></Icon> {$_("sidebar.userbar.friendsEntry")}</div>
            <Icon name="Direction/Right"></Icon></Button
        >
    </Label>
    <Label isOpen label={$_("sidebar.userbar.newEntries")} icon="Plus">
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
        ><div class="elem-horiz"><Icon name="Announcement"></Icon> {$_("sidebar.userbar.newSoapboxEntry")}</div>
            <Icon name="Direction/Right"></Icon></Button
            >
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
        ><div class="elem-horiz"><Icon name="Users"></Icon> {$_("sidebar.userbar.newGroupEntry")}</div>
        <Icon name="Direction/Right"></Icon></Button
        >
    </Label>
    <Label isOpen label={$_("sidebar.userbar.archiveEntries")} icon="Clock">
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="Library"></Icon> {$_("sidebar.userbar.thingsEntry")}</div>
            <Icon name="Direction/Right"></Icon></Button
        >
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="Bookmark"></Icon> {$_("sidebar.userbar.savedEntry")}</div>
            <Icon name="Direction/Right"></Icon></Button
        >
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="Archive"></Icon> {$_("sidebar.userbar.archivedEntry")}</div>
            <Icon name="Direction/Right"></Icon></Button
        >
    </Label>
    <Label isOpen label={$_("sidebar.userbar.aboutEntries")} icon="Info">
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="Cloud"></Icon> {$_("sidebar.userbar.instanceEntry")}</div>
            <Icon name="Direction/Right"></Icon></Button
        >
        <Button scaleClick={0.95} scaleHover={1.05} alignment="space-between" width="100%"
            ><div class="elem-horiz"><Icon name="List"></Icon> {$_("sidebar.userbar.changelogEntry")}</div>
            <Icon name="Direction/Right"></Icon></Button
        >
    </Label>
    <Button
        action={()=>{
            localStorage.removeItem("tokens")
            localStorage.removeItem("isDev")
            localStorage.removeItem("server")
            window.location.replace("/login")
        }}
        style="destructive"
        scaleClick={0.95}
        scaleHover={1.05}
        alignment="flex-start"
        width="100%"
    >
        <Icon name="Exit"/> {$_("sidebar.userbar.logoutEntry")}
    </Button>
</div>

<style lang="scss">

    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;  

    .options {
		width: 320px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: v.$spacing-def;
        box-sizing: border-box;
		overflow-y: auto;
		overflow-x: hidden;
		height: calc(100vh - 150px);
		padding-bottom: 66px;
	}
</style>;