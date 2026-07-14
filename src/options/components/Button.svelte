<script lang="ts">
    export let variant: 'default' | 'emoji' = 'default';
    export let title = '';
</script>

<button
    type="button"
    class={$$props.class}
    class:button={true}
    class:emoji={variant === 'emoji'}
    {title}
    on:click
>
    <slot />
</button>

<style>
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: var(--button-color);
        border: 1px solid var(--button-border-color);
        color: var(--button-text-color);
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;
        font-weight: 500;
        padding: 8px 16px;
        user-select: none;
        line-height: 1;
        font-size: 12px;
    }

    .emoji {
        width: 28px;
        height: 28px;
        padding: 0;
        border: none;
        background: transparent;
        border-radius: 50%;
    }

    .button:hover {
        background-color: var(--button-hover-color);
    }

    .button:active {
        background-color: var(--button-active-color);
    }
</style>
