type Options = {
    interval: number;
    timeout?: number;
};

type State = {
    intervalId?: string | number | NodeJS.Timeout;
    requestIdleCallbackId?: number;
    isRequestIdleCallbackScheduled: boolean;
};

type CancelCallback = () => void;

/**
 * `callback` function is invoked when after `interval` msec and environment is idled.
 * `callback` which have a `timeout` specified may be called out-of-order if necessary in order to run them before the timeout elapses.
 * @param callback
 * @param options
 * @return {function} return cancelRequestIdleInterval function
 */
export function requestIdleInterval(callback: () => void, options: Options): CancelCallback {
    polyfill();

    if (options.interval <= options.timeout) {
        throw new Error(
            `options.timeout should be less than options.interval. Recommended: options.timeout is less than half of options.interval.`,
        );
    }

    const state: State = {
        isRequestIdleCallbackScheduled: false,
    };

    state.intervalId = setInterval(() => {
        // Only schedule the rIC if one has not already been set.
        if (state.isRequestIdleCallbackScheduled) {
            return;
        }

        state.isRequestIdleCallbackScheduled = true;
        state.requestIdleCallbackId = requestIdleCallback(
            () => {
                // Reset the boolean so future rICs can be set.
                state.isRequestIdleCallbackScheduled = false;
                callback();
            },
            {
                timeout: options.timeout,
            },
        );
    }, options.interval);

    // Return cancel function
    return () => {
        if (state.intervalId !== undefined) {
            clearInterval(state.intervalId);
        }

        if (state.requestIdleCallbackId !== undefined) {
            cancelIdleCallback(state.requestIdleCallbackId);
        }
    };
}

// https://developer.chrome.com/blog/using-requestidlecallback
function polyfill(): void {
    if ('requestIdleCallback' in window) {
        return;
    }

    (window as Window).requestIdleCallback = function (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
    ) {
        const start = Date.now();
        const intervalId = setTimeout(function () {
            callback({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - start));
                },
            });
        }, 1);

        return intervalId as unknown as number;
    };

    (window as Window).cancelIdleCallback = function (id) {
        clearTimeout(id);
    };
}
