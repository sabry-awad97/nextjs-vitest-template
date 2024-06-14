import { useCallback, useEffect, useState } from 'react';

interface UseLocalStorageOptions<T> {
  key: string;
  initialValue?: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

interface UseLocalStorageResult<T> {
  storedValue: T | undefined;
  setValue: (value: T | ((val?: T) => T)) => void;
  removeValue: () => void;
}

export const useLocalStorage = <T>({
  key,
  initialValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
}: UseLocalStorageOptions<T>): UseLocalStorageResult<T> => {
  const readValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.error(`Error deserializing localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T | undefined>(readValue);

  const setValue = useCallback(
    (value: T | ((val?: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        localStorage.setItem(key, serialize(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serialize, storedValue],
  );

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(deserialize(item));
      } else if (initialValue !== undefined) {
        setStoredValue(initialValue);
        localStorage.setItem(key, serialize(initialValue));
      }
    } catch (error) {
      console.error(`Error initializing localStorage key "${key}":`, error);
    }
  }, [key, initialValue, serialize, deserialize]);

  // useEventListener('storage', (event: StorageEvent): void => {
  //   if (event.storageArea === window.localStorage && event.key === key) {
  //     setStoredValue(event.newValue ? deserialize(event.newValue) : undefined);
  //   }
  // });

  return { storedValue, setValue, removeValue };
};
