<script lang="ts">
    import { isHttps, port, token, server, authNumber, user } from "$lib/scripts/globalData";
	import { currentChat } from "$lib/scripts/chatViews";
	import { timeAgo } from '$lib/utils/timeAgo';
	import { checkServerReachability, fetchData } from '$lib/scripts/requests';
	import check from '$lib/minicons/check.svg';
	import Avatar from '$lib/kit/decor/Avatar.svelte';
	import { _ } from 'svelte-i18n';
	import Icon from "../decor/Icon.svelte";
	import { auther } from "lib/scripts/utils";
	let {
		unreads = 0,
		isUnreads = unreads != 0,
		preview = 'egg',
		timestamp = Date.parse('2025-02-14 00:00:00') as number,
		isFavorite = false,
		pfpLink = 'amity.png',
		isSelected = false,
		data = {
			type: '',
			id: {
				id: '',
				server: ''
			}
		},
		click = ()=>{},
		rightClick = () => {},
		hover = () => {},
		leave = () => {},
		isSidebar = false
	} = $props();

	let tempData = $state({
		name: '',
		description: '',
		icon: '',
		id: {
			id: '',
			server: ''
		},
		has_channels: false,
		channels: [],
		members: []
	});
	let isMultiGroup = $state(false);
	let chatType = $state('');
	let datenow = $state(Date.now());

	setInterval(() => {
		datenow = Date.now();
	}, 1.5 * 1000);

	let isReachable = $state(true);

	const getData = async () => {
		
		try{
			let isHttp = $isHttps
			isReachable = await checkServerReachability(`http${$isHttps ? "s" : ""}://${data.id.server}:${$port}`)
			if(!isReachable){
				isReachable = await checkServerReachability(`http${!$isHttps ? "s" : ""}://${data.id.server}:${$port}`)
				if(!isReachable) return
				isHttp = !$isHttps
			}
			let url = `http${!isHttp ? "" : "s"}://${data.id.server}:${$port}/group/${data.id.id}/info?totp=${auther($authNumber)}&uid=${$user.id.id}&homeserver=${$user.id.server}`;
			const res = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				},
				
			});

			const responseData = await res.json()

			if (responseData) {
				tempData = responseData;
				isMultiGroup = tempData.has_channels;
				chatType = isMultiGroup ? "group" : "monogroup";
			}
		}catch(err){
			console.error(err)
		}
	};

	$effect(() => {
		getData()
	})
</script>

<button 
	onclick={(e)=>{
		click(e, data, tempData)
		if(isSidebar && !isMultiGroup && isReachable) currentChat.set({
			type: chatType as "empty" | "dm" | "channel" | "monogroup" | "soapbox",
			name: tempData.name,
			icon: tempData.icon,
			id: {
				id: tempData.id.id,
				server: tempData.id.server
			},
			memberList: tempData.members
		})
	}} 
	oncontextmenu={(e)=>{rightClick(e)}} 
	onmouseenter={(e)=>{hover(e)}} 
	onmouseleave={(e)=>{leave(e)}} 
	class="chatEntry {isSelected ? 'selected' : ''} {isReachable ? '' : 'unreachable'}">
	{#if isReachable}
		<Avatar {pfpLink} />
	{:else}
		<div class="icon">
			<Icon name="Warning"/>
		</div>
	{/if}
	<div class="info">
		<div class="line">
			<div class="horiz">
				<div class="name">{isReachable ? tempData?.name : $_("sidebar.unreachable")}</div>
				{#if isFavorite}
					<svg
						width="11"
						height="10"
						viewBox="0 0 11 10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="star"
							d="M4.13773 2.19263C4.46926 1.1723 4.63502 0.66213 4.84567 0.479862C5.22133 0.154803 5.77867 0.154803 6.15433 0.479862C6.36498 0.66213 6.53074 1.1723 6.86227 2.19263V2.19263C6.95514 2.47846 7.00158 2.62138 7.07714 2.73526C7.21001 2.93551 7.41055 3.08121 7.64206 3.1457C7.77372 3.18237 7.92399 3.18237 8.22453 3.18237V3.18237C9.29737 3.18237 9.83379 3.18237 10.0722 3.32638C10.4975 3.58321 10.6697 4.11327 10.4766 4.571C10.3684 4.82766 9.93441 5.14296 9.06646 5.77356V5.77356C8.82332 5.95021 8.70175 6.03854 8.61679 6.1456C8.4674 6.33385 8.3908 6.5696 8.40101 6.8097C8.40681 6.94625 8.45325 7.08917 8.54612 7.375V7.375C8.87765 8.39533 9.04341 8.9055 8.98013 9.17677C8.86728 9.66056 8.41638 9.98815 7.9214 9.94598C7.64385 9.92234 7.20987 9.60704 6.34193 8.97644V8.97644C6.09878 8.79979 5.97721 8.71146 5.84914 8.66374C5.62394 8.57984 5.37606 8.57984 5.15086 8.66374C5.02279 8.71146 4.90122 8.79979 4.65807 8.97644V8.97644C3.79013 9.60704 3.35615 9.92234 3.0786 9.94598C2.58362 9.98815 2.13273 9.66056 2.01987 9.17677C1.95659 8.9055 2.12235 8.39533 2.45388 7.375V7.375C2.54675 7.08917 2.59319 6.94625 2.59899 6.8097C2.6092 6.5696 2.5326 6.33385 2.38321 6.1456C2.29825 6.03854 2.17668 5.95021 1.93354 5.77356V5.77356C1.06559 5.14296 0.631619 4.82766 0.523365 4.571C0.330303 4.11327 0.502529 3.58321 0.927766 3.32638C1.16621 3.18237 1.70263 3.18237 2.77547 3.18237V3.18237C3.07601 3.18237 3.22628 3.18237 3.35794 3.1457C3.58945 3.08121 3.78999 2.93551 3.92286 2.73526C3.99842 2.62138 4.04486 2.47846 4.13773 2.19263V2.19263Z"
							fill="#D20000"
							fill-opacity="0.8"
						/>
					</svg>
				{/if}
			</div>
			{#if isReachable}
				<div class="textPreview">{timeAgo(timestamp, datenow)}</div>
			{/if}
		</div>
		{#if isReachable}
			<div class="line">
				<div class="textPreview">{isMultiGroup ? tempData.channels.length + " channels" : preview}</div>
				{#if isUnreads}
					<div class="unreads">{unreads}</div>
				{:else}
					<div class="noUnreads"><img style="width: 12px" src={check} alt="#" /></div>
				{/if}
			</div>
		{/if}
	</div>
</button>

<style lang="scss">
	@use '$lib/style/variables.scss' as v;
	@use '$lib/style/colors.scss' as c;

	.icon{
		flex-shrink: 0;
		height: 36px;
		width: 36px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		border: 1px solid c.$accent;
	}

	.unreachable{
		border: 1px solid c.$accent;
		background-color: c.$accent-t10;
		background-image: repeating-linear-gradient(
			-45deg,
			transparent 15px,
			rgba(255, 0, 0, 0.25) 15px,
			rgba(255, 0, 0, 0.25) 35px,
			transparent 35px,
			transparent 55px /* added this so the pattern repeats seamlessly */
		);
	}

	.name{
		text-align: left;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.selected {
		display: flex;
		flex-direction: row;
		padding: v.$spacing-def;
		gap: v.$spacing-def;
		width: 100%;
		background-color: c.$accent-t50;
		height: 56px;
		border-radius: v.$corner-elem;
		border-width: 1px !important;
		border: solid;
		border-color: c.$accent;
		color: c.$text;
		box-sizing: border-box;
		@include v.standard-text();
	
		&:hover {
			background-color: c.$accent-t80;
		}
		&:active {
			background-color: c.$accent;
		}
		path {
			fill: c.$text-80;
		}
	}
	
	button {
		flex-shrink: 0;
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

	.unreads {
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
	.noUnreads {
		background-color: c.$text-50;
		border-radius: v.$corner-elem;
		padding-left: 6px;
		padding-right: 6px;
		height: 16px;
		font-size: 10px;
		display: flex;
		align-items: center;
	}
	.horiz {
		display: flex;
		flex-direction: row;
		gap: v.$spacing-def;
		width: 100%;
		overflow: hidden;
		// mess
		align-items: center;
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
