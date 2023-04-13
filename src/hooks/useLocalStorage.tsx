import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * useLocalStorage is a custom React hook that provides a two-way binding between
 * a value stored in localStorage and a state variable in the component.
 *
 * @template T - The type of the value to be stored in localStorage.
 * @param {string} key - The key to be used for storing the value in localStorage.
 * @param {T} initialValue - The initial value to be stored in localStorage if no value is found.
 * @returns {[T, Dispatch<SetStateAction<T>>]} - An array containing the current value from localStorage
 * and a function to set a new value.
 */
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const isClient = typeof window !== 'undefined';

  const [value, setValue] = useState<T>(() => {
    // Use a lazy initialization function for setting the initial value
    if (isClient && localStorage) {
      const storedValue = localStorage.getItem(key);
      try {
        return storedValue ? JSON.parse(storedValue) : initialValue;
      } catch (error) {
        console.error(
          `Error parsing localStorage value for key "${key}":`,
          error
        );
        return initialValue;
      }
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    // Use an effect to update the localStorage value when the state value changes
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isClient, key, value]);

  // Return an array with the current value from localStorage and the function to set a new value
  return [value, setValue];
}
