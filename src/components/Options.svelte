<script lang="ts">
    import { onMount } from "svelte";
    import { defaultStorage } from "../storage";
    import type { IStorage } from "../storage";
    import Fieldset from "./Fieldset.svelte";

    let options: IStorage | null = null;

    onMount(() => {
        chrome.storage.sync.get(defaultStorage, (res: IStorage) => {
            options = res;
        });
    });
</script>

<style>
</style>

<div class="container">
    {#if options}
        <Fieldset title="Hashtag hotkeys">
            <div>🙋 Filter by one: <b>today</b></div>
            <div>🙋 Multiple filter: <b>today 5m</b></div>
            <div style="margin-bottom: 10px">🙋 Clear filter: <i>leave the input empty</i></div>
            <div id="hotkeys" />
            <button id="add-hotkey" class="emoji-button">&#x2795;</button>
        </Fieldset>

        <Fieldset title="Swap hashtags">
            <label> <input type="checkbox" id="swap-hashtags-enabled" /> Enabled </label>
        </Fieldset>

        <Fieldset title="Other settings">
            <label> <input type="checkbox" id="calc-total-time" /> Calculate total time </label>
        </Fieldset>

        <div class="save-block"><button id="save">Save</button> <span id="status" /></div>
    {:else}
        <p>loading...</p>
    {/if}
</div>
