<script lang="ts">
    import { onMount } from 'svelte';
    import { KEYS, SPECIAL_KEYS } from '../../common/keyboard-keys';
    import type { IStorage } from '../../common/storage';
    import { readStorage, writeStorage } from '../../common/storage';
    import Button from './Button.svelte';
    import Fieldset from './Fieldset.svelte';
    import Select from './Select.svelte';

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
        options.swaps = [
            ...options.swaps,
            { insert: '', delete: '', key: 'home', specialKey: 'shift' },
        ];
    }

    function removeSwap(value: IStorage['swaps'][0]) {
        options.swaps = options.swaps.filter((sh) => sh !== value);
    }

    function addColor() {
        options.colors = [
            ...options.colors,
            { hashtag: '', color: '#ff0000', background: '#ff0000' },
        ];
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
        <Fieldset title="🔍 Filter by hashtags on hotkey">
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
                            <td>
                                <Select bind:value={filter.specialKey} options={SPECIAL_KEYS} />
                            </td>
                            <td>
                                <Select bind:value={filter.key} options={KEYS} />
                            </td>
                            <td><input type="text" bind:value={filter.hashtags} /></td>
                            <td>
                                <Button
                                    title="Remove"
                                    variant="emoji"
                                    on:click={() => removeFilter(filter)}>➖</Button
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <Button class="add-button" title="Add" variant="emoji" on:click={addFilter}>➕</Button>
        </Fieldset>

        <Fieldset title="🔀 Swap hashtags on hotkey">
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
                            <td>
                                <Select bind:value={swap.specialKey} options={SPECIAL_KEYS} />
                            </td>
                            <td>
                                <Select bind:value={swap.key} options={KEYS} />
                            </td>
                            <td><input type="text" bind:value={swap.insert} /></td>
                            <td><input type="text" bind:value={swap.delete} /></td>
                            <td>
                                <Button
                                    title="Remove"
                                    variant="emoji"
                                    on:click={() => removeSwap(swap)}>➖</Button
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <Button class="add-button" title="Add" variant="emoji" on:click={addSwap}>➕</Button>
        </Fieldset>

        <Fieldset title="⚙️ Other settings">
            <label>
                <input type="checkbox" bind:checked={options.calcTotalTime} />Calculate total time
            </label>
        </Fieldset>

        <Fieldset title="🎨 Hashtag line color">
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
                                <Button
                                    title="Remove"
                                    variant="emoji"
                                    on:click={() => removeColor(color)}>➖</Button
                                >
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <Button class="add-button" title="Add" variant="emoji" on:click={addColor}>➕</Button>
        </Fieldset>

        <div>
            <Button on:click={save}>Save</Button>
            {#if successMessage}<span class="success">{successMessage}</span>{/if}
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<style>
    .container {
        min-width: 600px;
    }

    table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        margin-bottom: 4px;
    }

    table td,
    table th {
        border: 1px solid var(--button-border-color);
        padding: 4px 8px;
    }

    .container :global(.add-button) {
        display: flex;
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
