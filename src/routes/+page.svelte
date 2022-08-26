<script>
	import Editor from '$lib/Editor.svelte'

	let editor;
	function handleMousemove() {
		editor.commands.focus();
	}
</script>


<svelte:window  on:mousemove={handleMousemove}/>
<svelte:head>
	<title>Cookiepad</title>
	<meta name="A simple editor that saves to your cookies" content="Cookiepad" />
</svelte:head>
<section>
    <div class="text-3xl xl:mx-[30%] lg:mx-90 md:mx-100 mx-40 sm:mx-20 mb-24 m-0 h-auto">
		<Editor bind:editor={editor} />
	</div>
</section>
