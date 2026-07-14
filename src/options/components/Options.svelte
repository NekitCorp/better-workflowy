<script lang="ts">
    import { onMount } from 'svelte';
    import { HotkeysManager } from '../../modules/hotkeys';
    import { Logger } from '../../modules/logger';
    import { storage } from '../../modules/storage';
    import Button from './Button.svelte';
    import Fieldset from './Fieldset.svelte';
    import HashtagsPreview from './HashtagsPreview.svelte';
    import ShortcutInput from './ShortcutInput.svelte';

    const hotkeyManager = new HotkeysManager(new Logger());

    let options: IStorage | null = null;
    let saveButtonText = 'Save';

    onMount(() => {
        storage.readStorage((data) => {
            options = data;
        });
    });

    function addSearch() {
        options.search = [...options.search, { value: '', shortcut: 'shift+home' }];
    }

    function removeSearch(value: IStorage['search'][0]) {
        options.search = options.search.filter((h) => h !== value);
    }

    function addSwap() {
        options.swaps = [...options.swaps, { insert: '', delete: '', shortcut: 'shift+home' }];
    }

    function removeSwap(value: IStorage['swaps'][0]) {
        options.swaps = options.swaps.filter((sh) => sh !== value);
    }

    function addColor() {
        options.colors = [
            ...options.colors,
            { hashtag: '', color: '#000000', background: '#ff0000' },
        ];
    }

    function removeColor(value: IStorage['colors'][0]) {
        options.colors = options.colors.filter((color) => color !== value);
    }

    function save() {
        storage.writeStorage(options, () => {
            saveButtonText = '✅ Saved!';

            setTimeout(() => {
                saveButtonText = 'Save';
            }, 1500);
        });
    }
</script>

<div class="container">
    {#if options}
        <Fieldset title="🔍 Hotkey search">
            <div>🙋 Search by text: <b>products</b></div>
            <div>🙋 Single hashtag search: <b>#today</b></div>
            <div>🙋 Multiple hashtag search: <b>#today #5m #important</b></div>
            <div style="margin-bottom: 10px">🙋 Clear search: <i>leave the input empty</i></div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Hotkey</th>
                            <th>Search</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each options.search as item}
                            <tr>
                                <td>
                                    <ShortcutInput bind:value={item.shortcut} {hotkeyManager} />
                                </td>
                                <td><input type="text" bind:value={item.value} /></td>
                                <td>
                                    <Button
                                        title="Remove"
                                        variant="emoji"
                                        on:click={() => removeSearch(item)}>🗑️</Button
                                    >
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <Button class="add-button" title="Add" on:click={addSearch}>Add new</Button>
        </Fieldset>

        <Fieldset title="🔀 Swap hashtags on hotkey">
            <div>🙋 Enter the hashtag name without <b>#</b></div>
            <div>🙋 To specify multiple hashtags, separate them with a space</div>
            <div style="margin-bottom: 10px">🙋 Leave the input empty to skip action</div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Hotkey</th>
                            <th>Insert hashtags</th>
                            <th>Delete hashtags</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each options.swaps as swap}
                            <tr>
                                <td>
                                    <ShortcutInput bind:value={swap.shortcut} {hotkeyManager} />
                                </td>
                                <td>
                                    <div class="preview-input">
                                        <input type="text" bind:value={swap.insert} />
                                        <HashtagsPreview bind:value={swap.insert} />
                                    </div>
                                </td>
                                <td>
                                    <div class="preview-input">
                                        <input type="text" bind:value={swap.delete} />
                                        <HashtagsPreview bind:value={swap.delete} />
                                    </div>
                                </td>
                                <td>
                                    <Button
                                        title="Remove"
                                        variant="emoji"
                                        on:click={() => removeSwap(swap)}>🗑️</Button
                                    >
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <Button class="add-button" title="Add" on:click={addSwap}>Add new</Button>
        </Fieldset>

        <Fieldset title="🕒 Calculate total time">
            <div style="margin-bottom: 10px">
                🙋 Supported formats: <b>#1d</b>, <b>#2h</b>, <b>#3m</b>, <b>#4s</b>, <b>#2h30m</b>,
                <b>#1d12h30m50s</b>
            </div>
            <label>
                <input type="checkbox" bind:checked={options.time.enabled} />Enabled
            </label>
            <fieldset disabled={!options.time.enabled} class="time-format-container">
                <span>Format:</span>
                <label>
                    <input
                        type="radio"
                        bind:group={options.time.format}
                        name="time-format"
                        value="d"
                    />
                    d
                </label>
                <label>
                    <input
                        type="radio"
                        bind:group={options.time.format}
                        name="time-format"
                        value="h"
                    />
                    h
                </label>
                <label>
                    <input
                        type="radio"
                        bind:group={options.time.format}
                        name="time-format"
                        value="m"
                    />
                    m
                </label>
                <label>
                    <input
                        type="radio"
                        bind:group={options.time.format}
                        name="time-format"
                        value="s"
                    />
                    s
                </label>
            </fieldset>
        </Fieldset>

        <Fieldset title="🎨 Hashtag line color">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Hashtag</th>
                            <th>Font color</th>
                            <th>Background color</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each options.colors as color}
                            <tr>
                                <td><input type="text" bind:value={color.hashtag} /></td>
                                <td><input type="color" bind:value={color.color} /></td>
                                <td><input type="color" bind:value={color.background} /></td>
                                <td>
                                    <span
                                        style:color={color.color}
                                        style:background={color.background}
                                    >
                                        preview
                                    </span>
                                </td>
                                <td>
                                    <Button
                                        title="Remove"
                                        variant="emoji"
                                        on:click={() => removeColor(color)}>🗑️</Button
                                    >
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <Button class="add-button" title="Add" on:click={addColor}>Add new</Button>
        </Fieldset>

        <div class="footer">
            <Button on:click={save}>{saveButtonText}</Button>
        </div>
    {:else}
        <p>Loading...</p>
    {/if}
</div>

<style>
    .container {
        position: relative;
        min-width: 600px;
        display: grid;
        gap: 10px;
    }

    .table-container {
        overflow: auto;
        margin-bottom: 4px;
    }

    table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
    }

    thead > tr > th:last-child {
        /* Width by content */
        width: 1%;
    }

    table td,
    table th {
        border: 1px solid var(--button-border-color);
        padding: 4px 8px;
    }

    .container :global(.add-button) {
        width: 100%;
    }

    label {
        display: flex;
        align-items: center;
    }

    input {
        border: 1px solid var(--button-border-color);
    }

    .preview-input {
        display: grid;
        gap: 4px;
    }

    .time-format-container {
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        padding: 4px 0;
    }

    .footer {
        position: sticky;
        bottom: 0;
        background-color: var(--background-color);
        padding: 10px 8px;
        margin: 0 -8px -8px -8px;
        border-top: 1px solid var(--button-border-color);
    }
</style>
