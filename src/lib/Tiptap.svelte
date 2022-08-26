<svelte:options accessors={true}/>

<script>
    import { onMount, onDestroy } from 'svelte'
    import { get } from 'svelte/store'
    import { tiptap_json } from '../store.js'
    import { Editor } from '@tiptap/core'
    import Document from '@tiptap/extension-document'
    import Paragraph from '@tiptap/extension-paragraph'
    import Text from '@tiptap/extension-text'
    import Bold from '@tiptap/extension-bold'
    import Italic from '@tiptap/extension-italic'
    import Underline from '@tiptap/extension-underline'
    import Strike from '@tiptap/extension-strike'
    import BulletList from '@tiptap/extension-bullet-list'
    import OrderedList from '@tiptap/extension-ordered-list'
    import ListItem from '@tiptap/extension-list-item'
    import History from '@tiptap/extension-history'

    let show_toolbar = false;
    let is_toolbar_hover = false;

    import { fly } from 'svelte/transition';

    import Tooltip from './Tooltip.svelte';

    let element
    export let editor

    onMount(() => {
        editor = new Editor({
            element: element,
            content: get(tiptap_json),
            extensions: [
                Document,
                Paragraph,
                Text,
                Bold,
                Italic,
                Underline,
                Strike,
                ListItem,
                BulletList,
                OrderedList,
                History,
            ],
            autofocus: true,
            editable: true,
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor
            },
            onBlur: () => {
                editor.commands.focus()
            },
            onUpdate: ({ editor }) => {
                const json = editor.getJSON()
                tiptap_json.set(json)
            },
            onSelectionUpdate: ({ editor }) => {
                if(editor.view.state.selection.empty) {
                    show_toolbar = false;
                } else {
                    show_toolbar = true;
                }
            },
        })
    })

    onDestroy(() => {
        if (editor) {
        editor.destroy()
        }
    })
</script>

{#if editor}
    <div on:mouseleave={()=>{is_toolbar_hover = false}} on:mouseenter={()=>{is_toolbar_hover = true}} 
        class="z-10 sticky top-0 grid place-items-center pb-20 pt-10">
    {#if show_toolbar || is_toolbar_hover}
        <div class="absolute rounded-md p-3 bg-slate-100 m-0 flex gap-3" in:fly="{{ y: -80, duration: 500 }}" out:fly="{{ y: -80, duration: 350 }}">
            <Tooltip title="Ctrl-B">
                <button 
                    on:click={() => {editor.chain().focus().toggleBold().run()}}
                    class="bg-gray-300 {editor.isActive('bold') ? 'bg-gray-400': 'bg-gray-300'} py-2 px-4 rounded" 
                >
                    <!-- https://fonts.google.com/icons?icon.query=bold -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" height='20' width='20'><path d="M14 36V8h11.4q3.3 0 5.725 2.1t2.425 5.3q0 1.9-1.05 3.5t-2.8 2.45v.3q2.15.7 3.475 2.5 1.325 1.8 1.325 4.05 0 3.4-2.625 5.6Q29.25 36 25.75 36Zm4.3-16.15h6.8q1.75 0 3.025-1.15t1.275-2.9q0-1.75-1.275-2.925Q26.85 11.7 25.1 11.7h-6.8Zm0 12.35h7.2q1.9 0 3.3-1.25t1.4-3.15q0-1.85-1.4-3.1t-3.3-1.25h-7.2Z"/></svg>
                </button>
            </Tooltip>
            <Tooltip title="Ctrl-I">
                <button 
                    on:click={() => {editor.chain().focus().toggleItalic().run()}}
                    class="bg-gray-300 {editor.isActive('italic') ? 'bg-gray-400': 'bg-gray-300'} py-2 px-4 rounded" 
                >
                    <!-- https://fonts.google.com/icons?icon.query=italic -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" height='20' width='20'><path d="M10 40v-5h6.85l8.9-22H18V8h20v5h-6.85l-8.9 22H30v5Z"/></svg>
                </button>
            </Tooltip>
            <Tooltip title="Ctrl-U">
                <button 
                    on:click={() => {editor.chain().focus().toggleUnderline().run()}}
                    class="bg-gray-300 {editor.isActive('underline') ? 'bg-gray-400': 'bg-gray-300'} py-2 px-4 rounded" 
                >
                    <!-- https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_underlined/default/48px.svg -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" height='20' width='20'><path d="M10 42v-3h28v3Zm14-8q-5.05 0-8.525-3.45Q12 27.1 12 22.1V6h4v16.2q0 3.3 2.3 5.55T24 30q3.4 0 5.7-2.25Q32 25.5 32 22.2V6h4v16.1q0 5-3.475 8.45Q29.05 34 24 34Z"/></svg>
                </button>
            </Tooltip>
            <Tooltip title="Ctrl-Shift-X">
                <button 
                    on:click={() => {editor.chain().focus().toggleStrike().run()}}
                    class="bg-gray-300 {editor.isActive('strike') ? 'bg-gray-400': 'bg-gray-300'} py-2 px-4 rounded" 
                >
                    <!-- https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/strikethrough_s/default/48px.svg -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" height='20' width='20'><path d="M25.2 40q-3.9 0-7.1-2.075-3.2-2.075-4.65-5.575l3.45-1.45q1 2.4 3.25 3.85 2.25 1.45 5.05 1.45 2.6 0 4.15-1.35 1.55-1.35 1.55-3.65 0-1.15-.475-2.425T29.1 26.5h4.2q.7 1.15 1.05 2.3.35 1.15.35 2.4 0 3.9-2.65 6.35Q29.4 40 25.2 40ZM4 23.5v-3h40v3ZM23.7 7.7q3.3 0 5.85 1.55t3.75 4.3l-3.45 1.55q-.7-1.7-2.325-2.65-1.625-.95-3.825-.95-2.45 0-3.95 1.2t-1.5 3.3q0 .4.05.75t.15.75h-3.7q-.1-.4-.15-.8-.05-.4-.05-.8 0-3.65 2.55-5.925T23.7 7.7Z"/></svg>
                </button>
            </Tooltip>
            <Tooltip title="Ctrl-Shift-8">
                <button 
                    on:click={() => {editor.chain().focus().toggleBulletList().run()}}
                    class="bg-gray-300 {editor.isActive('bulletList') ? 'bg-gray-400': 'bg-gray-300'} py-2 px-4 rounded" 
                >
                    <!-- https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_list_bulleted/default/48px.svg -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" height='20' width='20'><path d="M8.55 39q-1.05 0-1.8-.725T6 36.55q0-1.05.75-1.8t1.8-.75q1 0 1.725.75.725.75.725 1.8 0 1-.725 1.725Q9.55 39 8.55 39ZM16 38v-3h26v3ZM8.55 26.5q-1.05 0-1.8-.725T6 24q0-1.05.75-1.775.75-.725 1.8-.725 1 0 1.725.75Q11 23 11 24t-.725 1.75q-.725.75-1.725.75Zm7.45-1v-3h26v3ZM8.5 14q-1.05 0-1.775-.725Q6 12.55 6 11.5q0-1.05.725-1.775Q7.45 9 8.5 9q1.05 0 1.775.725Q11 10.45 11 11.5q0 1.05-.725 1.775Q9.55 14 8.5 14Zm7.5-1v-3h26v3Z"/></svg>
                </button>
            </Tooltip>
            <Tooltip title="Ctrl-Shift-7">
                <button 
                    on:click={() => {editor.chain().focus().toggleOrderedList().run()}}
                    class="bg-gray-300 {editor.isActive('orderedList') ? 'bg-gray-400': 'bg-gray-300'} py-2 px-4 rounded" 
                >
                    <!-- https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_list_numbered/default/48px.svg -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" height='20' width='20'><path d="M6 40v-1.7h4.2V37H8.1v-1.7h2.1V34H6v-1.7h5.9V40Zm10.45-2.45v-3H42v3ZM6 27.85v-1.6l3.75-4.4H6v-1.7h5.9v1.6l-3.8 4.4h3.8v1.7Zm10.45-2.45v-3H42v3ZM8.1 15.8V9.7H6V8h3.8v7.8Zm8.35-2.55v-3H42v3Z"/></svg>
                </button>
            </Tooltip>
        </div>
    {/if}
    </div>
    <style>
        .ProseMirror:focus {
            outline:none;
        }
        .ProseMirror {
            caret-color: black;

            p {
                padding-bottom: 0.4rem;
                padding-top: 0.4rem;
            }
        }
    </style>
{/if}

<div bind:this={element}/>


