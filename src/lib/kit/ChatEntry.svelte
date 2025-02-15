<script lang="ts">
    let {
        unreads = 0,
        isUnreads = unreads != 0,
        username = "user",
        preview = "egg",
        timestamp = Date.parse("2025-02-14 00:00:00") as number,
        isFavorite = false,
        pfpLink = "src/lib/amity.png"
    } = $props()
// btw for timestamp u could just snap datetime type.
    const _pfpLinkRETARD: string = "http://localhost:5173/src/lib/amity.png"; // you fucking retarded this doesn't work outside of localhost

    import check from "$lib/minicons/check.svg"
    import star from "$lib/minicons/star.svg"
	import { timeAgo } from "$lib/utils/timeAgo";
	import Avatar from "./Avatar.svelte";

    let datenow = $state(Date.now());

    setInterval(() => {
        datenow = Date.now()
    }, 1.5 * 1000)
</script>
<button class="chatEntry">
    <Avatar {pfpLink} />
    <div class="info">
        <div class="line">
            <div class="horiz">
                <div>{username}</div>
                {#if isFavorite}
                    <img src={star} style="height: 10px;" alt="#"/>
                {/if}
            </div>
            <div class="textPreview">{timeAgo(timestamp, datenow)}</div>
        </div>
        <div class="line">
            <div class="textPreview">{preview}</div>
            {#if isUnreads}
                <div class="unreads">{unreads}</div>
            {:else}
                <div class="noUnreads"><img style="width: 12px" src={check} alt="#"/></div>
            {/if}
        </div>
    </div>
</button>

<style lang="scss">
    
    @use "$lib/style/variables.scss" as v;
    @use "$lib/style/colors.scss" as c;

    .unreads{
        background-color: c.$accent-80;
        border-radius: v.$corner-elem;
        padding-left: 6px;
        padding-right: 6px;
        height: 16px;
        font-size: 10px;
        display: flex;
        align-items: center;
    }
    .noUnreads{
        background-color: c.$text-50;
        border-radius: v.$corner-elem;
        padding-left: 6px;
        padding-right: 6px;
        height: 16px;
        font-size: 10px;
        display: flex;
        align-items: center;
    }
    .horiz{
        display: flex;
        flex-direction: row;
        gap: 7px;
        // mess
        align-items: center;
    }
    .textPreview{
        color: c.$text-50;
    }
    .line{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .info{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .chatEntry{
        display: flex;
        flex-direction: row;
        padding: v.$spacing-def;
        gap: v.$spacing-def;
        width: 100%;
        background-color: c.$clickable;
        height: 56px;
        border-radius: v.$corner-elem;
        border: none;
        color: c.$text;
    }
    .chatEntry:hover{
        background-color: c.$hover;
    }
    .chatEntry:active{
        background-color: c.$clicked;
    }
</style>