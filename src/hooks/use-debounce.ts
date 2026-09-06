import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDeboucedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboucedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return debouncedValue;
}
