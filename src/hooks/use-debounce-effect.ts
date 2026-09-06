import { DependencyList, useEffect } from 'react';

export function useDebounceEffect(callback: () => void, dependencies: DependencyList, delay = 300) {
  useEffect(() => {
    const timer = setTimeout(callback, delay);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, delay]);
}
