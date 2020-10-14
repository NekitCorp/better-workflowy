<script lang="ts">
    import { keys, specialKeys } from "../../common/keyboard-keys";

    export let key = "";
    export let specialKey = "";
</script>

<style>
</style>

<td>
    <select bind:value={specialKey}>
        {#each specialKeys as specialKey}
            <option value={specialKey}>{specialKey}</option>
        {/each}
    </select>
</td>
<td>
    <select bind:value={key}>
        {#each keys as key}
            <option value={key}>{key}</option>
        {/each}
    </select>
</td>
