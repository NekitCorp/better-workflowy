<script lang="ts">
    export let title: string = "";
</script>

<style>
    fieldset {
        border-radius: 5px;
        border-color: var(--midnight-blue);
        margin-bottom: 10px;
    }

    legend {
        background-color: var(--midnight-blue);
        color: white;
        font-weight: bold;
        border-radius: 5px;
        padding: 2px 15px;
    }
</style>

<fieldset>
    <legend>{title}</legend>
    <slot />
</fieldset>
