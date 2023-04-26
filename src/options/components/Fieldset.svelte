<script lang="ts">
    export let title: string = '';
</script>

<fieldset>
    <legend>{title}</legend>
    <slot />
</fieldset>

<style>
    fieldset {
        border-radius: 5px;
        border: 1px solid var(--button-border-color);
        margin-bottom: 10px;
    }

    legend {
        border: 1px solid var(--button-border-color);
        font-weight: bold;
        border-radius: 5px;
        padding: 2px 15px;
    }
</style>
