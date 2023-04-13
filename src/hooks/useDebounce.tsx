import { useState, useEffect } from 'react';

/**
 * useDebounce is a custom React hook that debounces a value, delaying its update
 * until a certain amount of time has passed without any further changes.
 *
 * @template T - The type of the value to be debounced.
 * @param {T} value - The initial value to be debounced.
 * @param {number} delay - The delay time in milliseconds for debouncing. Default is 500ms.
 * @returns {T} - The debounced value.
 */
export default function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Use a setTimeout to delay updating the debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to cancel the timer if the value or delay changes
    return () => clearTimeout(timer);
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
}
