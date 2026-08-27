/**
 * Generic Request Debouncer with In-Flight Cancellation
 *
 * Batches rapid sequential calls for the same key, automatically canceling
 * any prior in-flight fetch request using an AbortController.
 */
export class RequestDebouncer<T> {
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  private abortControllers = new Map<string, AbortController>();

  /**
   * Dispatch a debounced operation for a specific key.
   *
   * @param key Unique identifier for the operation target (e.g. postId or commentId)
   * @param action Async operation receiving an AbortSignal
   * @param delayMs Debounce delay in milliseconds (default: 350ms)
   * @returns Promise resolving to the action result, or null if canceled by a newer call
   */
  dispatch(
    key: string,
    action: (signal: AbortSignal) => Promise<T>,
    delayMs = 350
  ): Promise<T | null> {
    // 1. Clear existing timer for this key
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key)!);
      this.timers.delete(key);
    }

    // 2. Abort any in-flight request for this key
    if (this.abortControllers.has(key)) {
      this.abortControllers.get(key)!.abort();
      this.abortControllers.delete(key);
    }

    return new Promise((resolve) => {
      const timer = setTimeout(async () => {
        this.timers.delete(key);

        const controller = new AbortController();
        this.abortControllers.set(key, controller);

        try {
          const result = await action(controller.signal);
          resolve(result);
        } catch (err: any) {
          if (err.name === 'AbortError') {
            // Canceled by a newer rapid click - resolve cleanly with null
            resolve(null);
            return;
          }
          // Propagate real network or parsing errors
          // eslint-disable-next-line no-console
          console.error(`[RequestDebouncer] Error for key "${key}":`, err);
          resolve(null);
        } finally {
          if (this.abortControllers.get(key) === controller) {
            this.abortControllers.delete(key);
          }
        }
      }, delayMs);

      this.timers.set(key, timer);
    });
  }

  /**
   * Cancel any pending timer and abort active request for a key immediately.
   */
  cancel(key: string): void {
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key)!);
      this.timers.delete(key);
    }
    if (this.abortControllers.has(key)) {
      this.abortControllers.get(key)!.abort();
      this.abortControllers.delete(key);
    }
  }

  /**
   * Clear all active timers and abort all in-flight requests.
   */
  clearAll(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    this.abortControllers.forEach((controller) => controller.abort());
    this.abortControllers.clear();
  }
}
