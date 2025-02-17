<script lang="ts">
	let { name = 'NegZero' } = $props();
</script>

<svg style="width: 16px; height:16px; fill: none;">
	<use xlink:href="#svg--{name.replaceAll('/', '-')}" />
</svg>
