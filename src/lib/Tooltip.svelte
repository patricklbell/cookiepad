<script>
    import { fade } from 'svelte/transition';

	export let title = '';
	let isHoverBegun = false;
	let hoverTime;
	let isHovered = false;
	let x;
	let y;
	
	function mouseOver(event) {
		x = event.screenX;
		y = event.screenY - 20;
		if(!isHoverBegun) {
			hoverTime = Date.now();
			isHoverBegun = true;
		}
		if(isHoverBegun) {
			if(Date.now() - hoverTime > 40) {
				isHovered = true;
				isHoverBegun = false;
			}
		}
		
	}
	function mouseMove(event) {
		x = event.screenX;
		y = event.screenY - 20;
	}
	function mouseLeave() {
		isHovered = false;
		isHoverBegun = false;
	}
</script>

<div
	on:mouseover={mouseOver}
  	on:mouseleave={mouseLeave}
	on:mousemove={mouseMove}
>
	<slot />
</div>

{#if isHovered}
	<div in:fade="{{duration:600}}" out:fade="{{duration:50}}" style="top: {y}px; left: {x}px;" class="text-black bg-slate-100 text-xl tooltip">{title}</div>
{/if}

<style>
	.tooltip {
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background: white;
		border-radius: 4px;
		padding: 4px;
		position: fixed;
		display: inline;
		pointer-events: none;
	}
</style>
