<script lang="ts">
	let { slogan = 'The chat app for everyone.', accent = '#D20000' } = $props();
</script>

<div>
	<p>{slogan}</p>
	<svg width="218" height="30" fill="none" viewBox="0 0 218 30" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M3.7998 6.55213C6.48668 6.55213 9.05567 5.97026 11.7094 5.62159C21.8096 4.29456 32.0574 4.0997 42.2278 4.07069C82.7238 3.95515 123.231 3.71101 163.681 5.93177C177.947 6.71504 192.214 7.28365 206.486 7.93071C208.879 8.03921 211.263 8.31755 213.654 8.41322C213.921 8.42389 214.076 8.388 213.723 8.48215C198.167 12.6305 182.224 14.2238 166.231 15.8231C141.5 18.2963 116.7 20.2635 91.9946 22.9917C88.7602 23.3489 85.5984 23.853 82.3445 23.9223C81.0992 23.9488 82.1849 24.2324 82.7926 24.2324C94.2036 24.2324 105.624 24.385 117.033 24.198C130.644 23.9749 144.182 23.3347 157.65 25.7834"
			stroke={accent}
			stroke-width="7"
			stroke-linecap="round"
		/>
	</svg>
</div>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;

	div {
		display: flex;
		flex-direction: column;
	}

	p {
		@include v.big-text;
		font-weight: bold;
		font-size: 64px;
	}

	svg {
		position: relative;
		bottom: 73px;
		left: 562px;
	}
</style>
