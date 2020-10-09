<script lang="ts">
    export let title: string = "";
</script>

<style>
</style>

<fieldset>
    <legend>{title}</legend>
    <slot />
</fieldset>
