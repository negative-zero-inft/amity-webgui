<script lang="ts">
	import { page } from '$app/state';
	const token = page.url.searchParams.get('token') ?? "";
	const server = page.url.searchParams.get('server') ?? "";

	localStorage.setItem('token', token);
	localStorage.setItem('server', server);
	window.location.replace('/chat');
</script>
