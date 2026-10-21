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
    let saveError = '';

    let syncEnabled = false;
    let syncBusy = false;
    let syncError = '';
    /** Settings found in the account while enabling sync, waiting for the user's choice */
    let pendingSynced: ISyncedSettings | null = null;

    onMount(async () => {
        syncEnabled = await storage.isSyncEnabled();
        options = await storage.readStorage();
    });

    async function onSyncToggle(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        const wanted = input.checked;
        // the checkbox reflects the actual state only
        input.checked = syncEnabled;

        await runSyncAction(async () => {
            if (!wanted) {
                await storage.disableSync();
                syncEnabled = false;
                return;
            }

            const synced = await storage.getSyncedSettings();

            if (synced) {
                pendingSynced = synced;
            } else {
                options = await storage.enableSync('upload', options);
                syncEnabled = true;
            }
        });
    }

    async function resolveSync(strategy: 'upload' | 'download') {
        await runSyncAction(async () => {
            options = await storage.enableSync(strategy, options);
            syncEnabled = true;
            pendingSynced = null;
        });
    }

    async function runSyncAction(action: () => Promise<void>) {
        syncBusy = true;
        syncError = '';

        try {
            await action();
        } catch (error) {
            syncError = error instanceof Error ? error.message : String(error);
        } finally {
            syncBusy = false;
        }
    }

    function describeSettings(data: IStorage): string {
        return [
            `${data.search.length} hotkey searches`,
            `${data.swaps.length} hashtag swaps`,
            `${data.colors.length} line colors`,
        ].join(', ');
    }

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

    async function save() {
        saveError = '';

        try {
            await storage.writeStorage(options);
        } catch (error) {
            saveError = error instanceof Error ? error.message : String(error);
            return;
        }

        saveButtonText = '✅ Saved!';

        setTimeout(() => {
            saveButtonText = 'Save';
        }, 1500);
    }
</script>

<div class="container">
    {#if options}
        <Fieldset title="☁️ Settings sync">
            <div style="margin-bottom: 10px">
                🙋 Sync settings across computers via your Google account (requires Chrome sync)
            </div>
            <label>
                <input
                    type="checkbox"
                    checked={syncEnabled}
                    disabled={syncBusy || pendingSynced !== null}
                    on:change={onSyncToggle}
                />Sync settings
            </label>
            {#if pendingSynced}
                <div class="sync-choice">
                    <div>
                        Your account already has settings saved on
                        <b>{new Date(pendingSynced.updatedAt).toLocaleString()}</b>
                        ({describeSettings(pendingSynced.data)}).
                    </div>
                    <div class="sync-choice-buttons">
                        <Button disabled={syncBusy} on:click={() => resolveSync('download')}>
                            Use synced settings
                        </Button>
                        <Button disabled={syncBusy} on:click={() => resolveSync('upload')}>
                            Upload this computer's settings
                        </Button>
                        <Button disabled={syncBusy} on:click={() => (pendingSynced = null)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            {/if}
            {#if syncError}
                <div class="error">❌ {syncError}</div>
            {/if}
        </Fieldset>

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
            {#if saveError}
                <span class="error">❌ {saveError}</span>
            {/if}
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

    .sync-choice {
        display: grid;
        gap: 8px;
        margin-top: 8px;
    }

    .sync-choice-buttons {
        display: flex;
        gap: 8px;
    }

    .error {
        color: #d32f2f;
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
