<script lang="ts">
    export let value: string;
    export let options: readonly string[];
</script>

<select bind:value>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>
