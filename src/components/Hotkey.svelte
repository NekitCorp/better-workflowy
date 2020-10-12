<script>
    import { keys, specialKeys } from "../utils/keyboard-keys";

    export let key = "";
    export let specialKey = "";
</script>

<style>
</style>

<select bind:value={specialKey}>
    {#each specialKeys as specialKey}
        <option value={specialKey}>{specialKey}</option>
    {/each}
</select>
<select bind:value={key}>
    {#each keys as key}
        <option value={key}>{key}</option>
    {/each}
</select>
