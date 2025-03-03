<script lang="ts">
	let { name = 'NegZero', size = 16 } = $props();
</script>

<svg style="width: {size}px; height: {size}px; fill: none; flex-shrink: 0;">
	<use xlink:href="#svg--{name.replaceAll('/', '-')}" />
</svg>
