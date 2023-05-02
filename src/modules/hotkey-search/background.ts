export function triggerInputEvent(value: string) {
    const SEARCH_INPUT_ID = 'srch-input';
    const input = document.getElementById(SEARCH_INPUT_ID);

    if (!(input instanceof HTMLInputElement)) {
        console.error(`[Better WorkFlowy] Search input #${SEARCH_INPUT_ID} not found.`);
        return;
    }

    // https://stackoverflow.com/questions/35659430/how-do-i-programmatically-trigger-an-input-event-without-jquery
    const valueSetter = Object.getOwnPropertyDescriptor(input, 'value')?.set;
    const prototype = Object.getPrototypeOf(input);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

    if (valueSetter && valueSetter === prototypeValueSetter) {
        valueSetter.call(input, value);
    } else {
        prototypeValueSetter.call(input, value);
    }

    input.dispatchEvent(new Event('input', { bubbles: true }));
}
