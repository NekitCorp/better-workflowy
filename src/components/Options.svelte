<script lang="ts">
    import { onMount } from "svelte";
    import { defaultStorage } from "../storage";
    import type { IStorage } from "../storage";
    import Fieldset from "./Fieldset.svelte";
    import { keys, specialKeys } from "../utils/keyboard-keys";

    let options: IStorage | null = null;
    let successMessage: string = null;

    onMount(() => {
        chrome.storage.sync.get(defaultStorage, (res: IStorage) => {
            options = res;
        });
    });

    function addHotkey() {
        options.hotkeys = [...options.hotkeys, { hash: "", key: "home", specialKey: "shift" }];
    }

    function removeHotkey(hotkey: IStorage["hotkeys"][0]) {
        options.hotkeys = options.hotkeys.filter((h) => h !== hotkey);
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

    function toggleSwapHashtags() {
        options.swapHashtags = options.swapHashtags ? null : { from: "", to: "" };
    }
</script>

<style>
</style>

<div class="container">
    {#if options}
        <Fieldset title="Hashtag hotkeys">
            <div>🙋 Filter by one: <b>today</b></div>
            <div>🙋 Multiple filter: <b>today 5m</b></div>
            <div>🙋 Clear filter: <i>leave the input empty</i></div>
            {#each options.hotkeys as hotkey}
                <select bind:value={hotkey.key}>
                    {#each keys as key}
                        <option value={key}>{key}</option>
                    {/each}
                </select>
                <select bind:value={hotkey.specialKey}>
                    {#each specialKeys as specialKey}
                        <option value={specialKey}>{specialKey}</option>
                    {/each}
                </select>
                <input type="text" bind:value={hotkey.hash} />
                <button class="emoji-button" on:click={() => removeHotkey(hotkey)}>➖</button>
            {/each}
            <button class="emoji-button" on:click={addHotkey}>➕</button>
        </Fieldset>

        <Fieldset title="Swap hashtags">
            <label><input
                    type="checkbox"
                    checked={Boolean(options.swapHashtags)}
                    on:change={toggleSwapHashtags} />Enabled</label>
            {#if Boolean(options.swapHashtags)}
                <input type="text" bind:value={options.swapHashtags.from} />
                <input type="text" bind:value={options.swapHashtags.to} />
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
