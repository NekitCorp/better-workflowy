<script lang="ts">
    import { onMount } from 'svelte';

    export let value = '';
    export let hotkeyManager: IHotkeysManager;

    type State =
        | {
              edit: false;
          }
        | {
              edit: true;
              shortcut: string;
              isModifierPressed: boolean;
              isLetterPressed: boolean;
          };

    let state: State = { edit: false };
    let inputElement: HTMLInputElement;
    /** Local draft shown in the input; parent `value` is only updated on successful capture */
    let displayValue = '';

    $: if (!state.edit) {
        displayValue = value;
    }

    function enableEditMode() {
        state = {
            edit: true,
            isLetterPressed: false,
            isModifierPressed: false,
            shortcut: '',
        };
        displayValue = '';
        inputElement.focus();
    }

    function disableEditMode() {
        state = { edit: false };
        displayValue = value;
    }

    function onKeydown(event: KeyboardEvent) {
        if (state.edit && event.key === 'Escape') {
            event.preventDefault();
            disableEditMode();
            inputElement.blur();
        }
    }

    onMount(() => {
        return hotkeyManager.setHotKey(
            hotkeyManager.ALL_KEYS,
            (params) => {
                if (state.edit) {
                    state.shortcut = params.shortcut;
                    state.isModifierPressed = params.isModifierPressed;
                    state.isLetterPressed = params.isLetterPressed;

                    if (params.isModifierPressed && params.isLetterPressed) {
                        value = params.shortcut;
                        disableEditMode();
                    }
                }
            },
            {
                element: inputElement,
            },
        );
    });

    function getPlaceholder(deps: { state: State; value: string }): string {
        if (deps.state.edit) {
            return 'Type a shortcut';
        }

        if (deps.value) {
            return `Shortcut set: ${deps.value}`;
        }

        return 'Not set';
    }

    function getError(deps: { state: State }): string | null {
        if (!deps.state.edit) {
            return null;
        }

        if (!deps.state.shortcut) {
            return null;
        }

        if (!deps.state.isModifierPressed) {
            return 'Must include modifier.';
        }

        if (!deps.state.isLetterPressed) {
            return 'Type a letter.';
        }

        return null;
    }

    $: placeholder = getPlaceholder({ state, value });
    $: error = getError({ state });
    $: readonly = !state.edit;
</script>

<div class="container">
    <div class="inputContainer">
        <input
            {readonly}
            {placeholder}
            autocomplete="off"
            aria-invalid={error ? 'true' : 'false'}
            bind:this={inputElement}
            bind:value={displayValue}
            on:blur={disableEditMode}
            on:keydown={onKeydown}
        />
        <div class="underline" class:underlineVisible={state.edit} class:underlineError={error} />
    </div>
    <button type="button" title="Edit shortcut" on:click={enableEditMode}>✏️</button>
    <span
        class="error"
        class:active={error}
        role={error ? 'alert' : undefined}
        aria-live="assertive"
    >
        {error ?? ''}
    </span>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 1fr min-content;
        align-items: center;
        gap: 0 4px;
    }

    .inputContainer {
        overflow: hidden;
        position: relative;
    }

    input {
        background-color: transparent;
        border: 1px solid var(--button-border-color);
        color: inherit;
        box-sizing: border-box;
        width: 100%;
        outline: none;
    }

    .underline {
        position: absolute;
        height: 2px;
        left: 1px;
        right: 1px;
        bottom: 1px;
        background-color: var(--main-color);
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        border-radius: 0 0 3px 3px;
    }

    .underlineVisible {
        opacity: 1;
    }

    .underlineError {
        background-color: #d93125;
    }

    button {
        width: 28px;
        height: 28px;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 50%;
        font-size: 12px;
    }

    button:hover {
        background-color: var(--button-hover-color);
    }

    .error {
        grid-column: 1 / span 2;
        color: #d93025;
        font-size: 0.625rem;
        line-height: 1;
        height: 1em;
        margin-top: 4px;
        visibility: hidden;
        text-align: left;
    }

    .error.active {
        visibility: visible;
    }
</style>
