<script lang="ts">
    let {name = "-0"} = $props();
</script>

<svg style="width: 16px; height:16px;">
    <use xlink:href="#svg--{name.replaceAll("/", "-")}" />
</svg>