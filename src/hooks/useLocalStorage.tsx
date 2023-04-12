import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const isClient = typeof window !== 'undefined';

  const [value, setValue] = useState<T>(() => {
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
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [isClient, key, value]);

  return [value, setValue];
}
