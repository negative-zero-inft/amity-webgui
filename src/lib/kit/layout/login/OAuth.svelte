<script lang="ts">
	import Button from "$lib/kit/Button.svelte";
	import { server } from "$lib/scripts/globalData";

    let {
        name = ""
    } = $props();

    function oauth() {
        window.location.replace(`http://${$server}/auth/${name}`);
    }
</script>
<Button width="100%; flex-shrink: 1;" action={oauth}><slot></slot></Button>