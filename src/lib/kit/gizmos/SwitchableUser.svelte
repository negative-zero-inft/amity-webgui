<script lang="ts">
    import { isHttps, port } from "$lib/scripts/globalData";
	import { fetchData } from '$lib/scripts/requests';
	import check from '$lib/minicons/check.svg';
	import Avatar from '$lib/kit/decor/Avatar.svelte';
	import { goto } from "$app/navigation";
	import Button from "./Button.svelte";
	import Icon from "../decor/Icon.svelte";
	import { token, server } from "$lib/scripts/globalData";

	let isDeleted = $state(false)
	let {
		data,
		index,
		tokens
	}: {
		data: {
			token: string, 
			server: "string",
			isHttps: boolean
		},
		index: number,
		tokens: []
	} = $props()

	let tempData = $state({
		name: "",
		tag: "",
		server: data.server,
		avatar: ""
	});
	let isCurrent = $token == data.token && $server == data.server;
	console.log($token, data.token, $server, data.server, isCurrent)

	const getData = async () => {
		const url = `http${data.isHttps ? "s" : ""}://${data.server}:${$port}/user/me?token=${data.token}`;
		const responseData = await fetchData(url);

		if (responseData) {
			tempData = responseData;
		}
	};

	$effect(() => {
		getData()
	})
</script>

<button 
	onclick={(e:MouseEvent)=>{
		if((e.target as HTMLElement).id != "del") window.location.replace(`/chat?token=${index}`)
	}} 
	id="chatEntry"
	class="chatEntry"
	style="
		display: {isDeleted || isCurrent ? "none" : "auto"}
	"
>
	<Avatar pfpLink={tempData.avatar} />
	<div class="info">
		<div class="line">
			<div class="name">{tempData.name}</div>
		</div>
		<div class="line">
			<div class="textPreview">{tempData.tag}@{data.server}</div>
		</div>
	</div>
	{#if !data.isHttps}
		<div class="isDev">
			<Icon name="Code"/>
		</div>
	{/if}
	<Button
		id="del"
		style="destructive"
		width="36px"
		action={()=>{
			tokens.splice(index, 1)
			localStorage.setItem("tokens", JSON.stringify(tokens))
			isDeleted = true
		}}
	>
		<Icon name="Exit"/>
	</Button>
</button>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.isDev {
		background-color: c.$accent-t80;
		border-radius: v.$corner-elem;
		padding-left: 6px;
		padding-right: 6px;
		height: 16px;
		font-size: 11px !important;
		display: flex;
		align-items: center;
		@include v.standard-text();
	}
	.name{
		text-align: left;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	button {
		align-items: center;
		white-space: nowrap;
		flex-direction: row !important;
		width: var(--w);
		justify-content: center;
		transition: 0.25s;
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
		overflow: hidden;
		@include v.standard-text();
	
		&:hover {
			background-color: c.$hover;
			transform: scale(1.05);
		}
		&:active {
			background-color: c.$clicked;
			transform: scale(0.95);
		}
	}
	.textPreview {
		color: c.$text-50;
	}
	.line {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: v.$spacing-def;
		height: 16px;
	}
	.info {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
	}

</style>
