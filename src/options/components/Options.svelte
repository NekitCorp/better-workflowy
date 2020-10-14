<script lang="ts">
    import { onMount } from "svelte";
    import type { IStorage } from "../../common/storage";
    import { defaultStorage } from "../../common/storage";
    import Fieldset from "./Fieldset.svelte";
    import HotkeyCols from "./HotkeyCols.svelte";

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

    .container {
        min-width: 500px;
    }

    table {
        width: 100%;
        text-align: center;
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

    .add-filter-button {
        display: block;
        margin: 0 auto;
    }

    label {
        display: flex;
        align-items: center;
    }

    .swap-hashtags-label {
        margin: 5px 0;
    }

    .swap-hashtags-label > input {
        flex: 1;
        margin-left: 5px;
    }

    .success {
        color: green;
        font-weight: bold;
    }
</style>

<div class="container">
    {#if options}
        <Fieldset title="Filter by hashtags on hotkey">
            <div>🙋 Filter by one: <b>today</b></div>
            <div>🙋 Multiple filter: <b>today 5m important</b> <i>(space separated)</i></div>
            <div style="margin-bottom: 10px">🙋 Clear filter: <i>leave the input empty</i></div>

            <table>
                <thead>
                    <tr>
                        <th>Special key</th>
                        <th>Key</th>
                        <th>Hashtags</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {#each options.filters as filter}
                        <tr>
                            <HotkeyCols bind:key={filter.key} bind:specialKey={filter.specialKey} />
                            <td><input type="text" bind:value={filter.hashtags} /></td>
                            <td>
                                <button
                                    class="emoji-button"
                                    title="Remove filter"
                                    on:click={() => removeFilter(filter)}>➖</button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <button
                class="emoji-button add-filter-button"
                title="Add new filter"
                on:click={addFilter}>➕</button>
        </Fieldset>

        <Fieldset title="Swap hashtags on hotkey">
            <div style="margin-bottom: 10px">🙋 Leave the input empty to skip action</div>
            <label><input
                    type="checkbox"
                    checked={Boolean(options.swapHashtags)}
                    on:change={toggleSwapHashtags} />Enabled</label>
            {#if Boolean(options.swapHashtags)}
                <label class="swap-hashtags-label">Insert hashtags:
                    <input type="text" bind:value={options.swapHashtags.insert} /></label>
                <label class="swap-hashtags-label">Delete hashtags:
                    <input type="text" bind:value={options.swapHashtags.delete} /></label>
                <div>
                    Hotkey:
                    <HotkeyCols
                        bind:key={options.swapHashtags.key}
                        bind:specialKey={options.swapHashtags.specialKey} />
                </div>
            {/if}
        </Fieldset>

        <Fieldset title="Other settings">
            <label>
                <input type="checkbox" bind:checked={options.calcTotalTime} />Calculate total time
            </label>
        </Fieldset>

        <div>
            <button on:click={save}>Save</button>
            {#if successMessage}<span class="success">{successMessage}</span>{/if}
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>
