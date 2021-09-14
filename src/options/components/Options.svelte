<script lang="ts">
    import { onMount } from 'svelte';
    import type { IStorage } from '../../common/storage';
    import { readStorage, writeStorage } from '../../common/storage';
    import Fieldset from './Fieldset.svelte';
    import HotkeyCols from './HotkeyCols.svelte';

    let options: IStorage | null = null;
    let successMessage: string = null;

    onMount(() => {
        readStorage((data) => {
            options = data;
        });
    });

    function addFilter() {
        options.filters = [...options.filters, { hashtags: '', key: 'home', specialKey: 'shift' }];
    }

    function removeFilter(value: IStorage['filters'][0]) {
        options.filters = options.filters.filter((h) => h !== value);
    }

    function addSwap() {
        options.swaps = [...options.swaps, { insert: '', delete: '', key: 'home', specialKey: 'shift' }];
    }

    function removeSwap(value: IStorage['swaps'][0]) {
        options.swaps = options.swaps.filter((sh) => sh !== value);
    }

    function addColor() {
        options.colors = [...options.colors, { hashtag: '', color: '#ff0000', background: '#ff0000' }];
    }

    function removeColor(value: IStorage['colors'][0]) {
        options.colors = options.colors.filter((color) => color !== value);
    }

    function save() {
        writeStorage(options, () => {
            successMessage = 'Options saved!';
            console.log(options);

            setTimeout(() => {
                successMessage = null;
            }, 1500);
        });
    }
</script>

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
                                <button class="emoji-button" title="Remove" on:click={() => removeFilter(filter)}>
                                    ➖
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <button class="emoji-button add-button" title="Add" on:click={addFilter}>➕</button>
        </Fieldset>

        <Fieldset title="Swap hashtags on hotkey">
            <div style="margin-bottom: 10px">🙋 Leave the input empty to skip action</div>

            <table>
                <thead>
                    <tr>
                        <th>Special key</th>
                        <th>Key</th>
                        <th>Insert hashtags</th>
                        <th>Delete hashtags</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {#each options.swaps as swap}
                        <tr>
                            <HotkeyCols bind:key={swap.key} bind:specialKey={swap.specialKey} />
                            <td><input type="text" bind:value={swap.insert} /></td>
                            <td><input type="text" bind:value={swap.delete} /></td>
                            <td>
                                <button class="emoji-button" title="Remove" on:click={() => removeSwap(swap)}>
                                    ➖
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <button class="emoji-button add-button" title="Add" on:click={addSwap}>➕</button>
        </Fieldset>

        <Fieldset title="Other settings">
            <label>
                <input type="checkbox" bind:checked={options.calcTotalTime} />Calculate total time
            </label>
        </Fieldset>

        <Fieldset title="Hashtag line color">
            <table>
                <thead>
                    <tr>
                        <th>Hashtag</th>
                        <th>Font color</th>
                        <th>Background color</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {#each options.colors as color}
                        <tr>
                            <td><input type="text" bind:value={color.hashtag} /></td>
                            <td><input type="color" bind:value={color.color} /></td>
                            <td><input type="color" bind:value={color.background} /></td>
                            <td>
                                <button class="emoji-button" title="Remove" on:click={() => removeColor(color)}>
                                    ➖
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <button class="emoji-button add-button" title="Add" on:click={addColor}>➕</button>
        </Fieldset>

        <div>
            <button on:click={save}>Save</button>
            {#if successMessage}<span class="success">{successMessage}</span>{/if}
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<style>
    :root {
        --blue: #c3e0e5;
        --dark-blue: #274472;
        --blue-gray: #5885af;
        --midnight-blue: #41729f;
    }

    .container {
        min-width: 600px;
    }

    table {
        width: 100%;
        text-align: center;
    }

    table th {
        text-decoration: underline;
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

    .add-button {
        display: block;
        margin: 0 auto;
    }

    label {
        display: flex;
        align-items: center;
    }

    .success {
        color: green;
        font-weight: bold;
    }
</style>
