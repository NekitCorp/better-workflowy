<script lang="ts">
    import { onMount } from "svelte";
    import type { IStorage } from "../storage";
    import { defaultStorage } from "../storage";
    import Fieldset from "./Fieldset.svelte";
    import Hotkey from "./Hotkey.svelte";

    let options: IStorage | null = null;
    let successMessage: string = null;

    onMount(() => {
        chrome.storage.sync.get(defaultStorage, (res: IStorage) => {
            options = res;
        });
    });

    function addFilter() {
        options.filters = [...options.filters, { hashtags: "", key: "home", specialKey: "shift" }];
    }

    function removeFilter(hotkey: IStorage["filters"][0]) {
        options.filters = options.filters.filter((h) => h !== hotkey);
    }

    function toggleSwapHashtags() {
        options.swapHashtags = options.swapHashtags
            ? null
            : { insert: "", delete: "", key: "home", specialKey: "shift" };
    }

    function save() {
        chrome.storage.sync.set(options, () => {
            successMessage = "Options saved!";
            console.log(options);

            setTimeout(() => {
                successMessage = null;
            }, 1500);
        });
    }
</script>

<style>
    :root {
        --blue: #c3e0e5;
        --dark-blue: #274472;
        --blue-gray: #5885af;
        --midnight-blue: #41729f;
    }

    .filter-container {
        display: flex;
        justify-content: space-between;
    }

    .emoji-button {
        border: none;
        background: transparent;
        box-shadow: none;
        border-radius: 50%;
        padding: 0;
        width: 25px;
        height: 25px;
        min-width: auto;
        cursor: pointer;
    }

    .emoji-button:hover {
        background: var(--blue);
    }
</style>

<div class="container">
    {#if options}
        <Fieldset title="Filter by hashtags on hotkey">
            <div>🙋 Filter by one: <b>today</b></div>
            <div>🙋 Multiple filter: <b>today 5m</b></div>
            <div>🙋 Clear filter: <i>leave the input empty</i></div>
            {#each options.filters as filter}
                <div class="filter-container">
                    <Hotkey bind:key={filter.key} bind:specialKey={filter.specialKey} />
                    <input type="text" bind:value={filter.hashtags} />
                    <button class="emoji-button" on:click={() => removeFilter(filter)}>➖</button>
                </div>
            {/each}
            <button class="emoji-button" on:click={addFilter}>➕</button>
        </Fieldset>

        <Fieldset title="Swap hashtags on hotkey">
            <label><input
                    type="checkbox"
                    checked={Boolean(options.swapHashtags)}
                    on:change={toggleSwapHashtags} />Enabled</label>
            {#if Boolean(options.swapHashtags)}
                <label>Insert hashtags:
                    <input type="text" bind:value={options.swapHashtags.insert} /></label>
                <label>Delete hashtags:
                    <input type="text" bind:value={options.swapHashtags.delete} /></label>
                <Hotkey
                    bind:key={options.swapHashtags.key}
                    bind:specialKey={options.swapHashtags.specialKey} />
            {/if}
        </Fieldset>

        <Fieldset title="Other settings">
            <label>
                <input type="checkbox" bind:checked={options.calcTotalTime} />Calculate total time
            </label>
        </Fieldset>

        <div class="save-block"><button on:click={save}>Save</button></div>
        {#if successMessage}<span class="success">{successMessage}</span>{/if}
    {:else}
        <p>Loading...</p>
    {/if}
</div>
