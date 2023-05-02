<script lang="ts">
    export let value: string;
</script>

<div class="container">
    {#each value.split(' ').filter(Boolean) as tag}
        <span class="tag">#{tag}</span>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    .tag {
        background-color: var(--button-hover-color);
        color: var(--button-text-color);
        border: 1px solid var(--button-border-color);
        padding: 2px 4px;
        border-radius: 10px;
    }
</style>
