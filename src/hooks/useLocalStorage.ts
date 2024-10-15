import { useState, useEffect, useCallback, useRef } from "react";
import { UseLocalStorageReturn } from "@/types/types";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Use a ref to store the initial value
  const initialValueRef = useRef(initialValue);

  const loadFromLocalStorage = useCallback(() => {
    setIsLoading(true);
    setError(null);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
        setStoredValue(initialValueRef.current);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setError(error instanceof Error ? error : new Error(String(error)));
      setStoredValue(initialValueRef.current);
    } finally {
      setIsLoading(false);
    }
  }, [key]); // Remove initialValue from dependencies

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
        setError(error instanceof Error ? error : new Error(String(error)));
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue, isLoading, error];
}
