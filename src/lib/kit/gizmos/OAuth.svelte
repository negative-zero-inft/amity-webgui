<script lang="ts">
	import Button from "$lib/kit/gizmos/Button.svelte";
	import { isHttps, port, server } from "$lib/scripts/globalData";

    let {
        name = "",
		children,
    } = $props();

    function oauth() {
        window.location.replace(`http${$isHttps ? "s" : ""}://${$server}:${$port}/oauth/${name}`);
    }
</script>
<Button width="100%; flex-shrink: 1;" action={oauth}>{@render children?.()}</Button>