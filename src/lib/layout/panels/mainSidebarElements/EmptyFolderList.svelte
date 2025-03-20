<script lang="ts">
    import { _ } from "svelte-i18n";
    import Icon from "$lib/kit/decor/Icon.svelte";
    import Button from "$lib/kit/gizmos/Button.svelte";
    import { folderCtxMenuView } from "$lib/scripts/chatViews";

    let {
        isFolder = false
    } = $props();
</script>

<div class="emptySidebar">
    {#if isFolder}
        <svg class="ceresFold" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.7954 13.5529L25.7507 4.2643C25.4027 3.20261 23.9008 3.20261 23.5528 4.2643L20.5104 13.5462C20.3409 14.0631 19.8342 14.392 19.2931 14.3364L12.1991 13.6072C11.2893 13.5137 10.6361 14.4634 11.0488 15.2795L17.1603 27.3654C17.3571 27.7546 17.7562 28 18.1923 28H31.1444C31.5631 28 31.9491 27.7737 32.1536 27.4084L38.9224 15.3165C39.378 14.5025 38.7321 13.5118 37.8035 13.6003L30.0041 14.3439C29.4658 14.3952 28.9638 14.0667 28.7954 13.5529Z" fill="#999999"/>
            <path d="M27.2752 17.0302L31.9853 27.1549C32.2106 27.6393 31.9483 28 31.3708 28H11.1657C10.5882 28 9.87245 27.6393 9.48898 27.1549L1.47357 17.0302C0.852495 16.2457 1.45446 15.6637 2.51387 16.0245L16.129 20.6604C16.5498 20.8036 16.9417 20.8036 17.1825 20.6604L24.9708 16.0245C25.5768 15.6637 26.9103 16.2457 27.2752 17.0302Z" fill="#BDBDBD"/>
            <path d="M25.4621 2.1348C26.0088 1.56462 26.9529 1.69654 27.3204 2.39448L28.7746 5.15617C29.1572 5.88277 30.1551 5.98877 30.6839 5.35897L31.2386 4.69842C31.9612 3.8378 33.2798 4.39751 33.0948 5.50519C32.7372 7.64769 32.1303 10.3169 31.1495 12.2001C30.7735 12.9221 30.1956 13.8109 29.7416 14.4783C29.3256 15.0898 28.5953 15.3983 27.8633 15.296L24.404 14.8126L21.1157 14.3531C20.2962 14.2386 19.6314 13.6319 19.4659 12.8215C19.3182 12.0983 19.1516 11.2131 19.0631 10.5112C18.811 8.50999 18.9358 5.94185 19.1283 3.8451C19.2333 2.701 20.7077 2.48992 21.1743 3.53903L21.4071 4.06254C21.7408 4.81289 22.7296 4.98453 23.2988 4.39093L25.4621 2.1348Z" fill="#BBBBBB"/>
        </svg>
    {:else}
        <img alt={$_("sidebar.sadBill")} src="/billSad.svg" />
    {/if}
    <div class="title" style="font-size: 18px;">{isFolder ? $_("sidebar.emptyFolder") : $_("sidebar.noChats")}</div>
    <div class="desc">{isFolder ? $_("sidebar.emptyFolderDesc") : $_("sidebar.noChatsDesc")}</div>
</div>

<style lang="scss">
    
    @use '$lib/style/colors.scss' as c;
    @use "$lib/style/variables.scss" as v;

    .ceresFold{
        width: 100px;
        backdrop-filter: blur(40px);
    }

    .desc{
        width: 100%;
        text-align: center;
    }

    .emptySidebar{
        flex-direction: column;
        gap: v.$spacing-def;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>