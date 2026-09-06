import React, { useEffect, useState } from 'react';

import { useDebounceEffect } from '@/hooks/use-debounce-effect';

type ChangeEventFor<TElement> = TElement extends HTMLTextAreaElement
  ? React.ChangeEvent<HTMLTextAreaElement>
  : React.ChangeEvent<HTMLInputElement>;

export function withDebounce<
  TElement extends HTMLInputElement | HTMLTextAreaElement,
  TProps extends {
    value?: string | number | readonly string[];
    onChange?: (e: ChangeEventFor<TElement>) => void;
  },
>(Component: React.ComponentType<TProps>) {
  type DebouncedProps = Omit<TProps, 'value' | 'onChange' | 'defaultValue'> & {
    defaultValue?: string;
    onChangeFinish: (value: string) => void;
  };

  return function Debounced({ defaultValue, onChangeFinish, ...props }: DebouncedProps) {
    const [typedValue, setTypedValue] = useState(defaultValue ?? '');

    useEffect(() => {
      setTypedValue(defaultValue ?? '');
    }, [defaultValue]);

    useDebounceEffect(
      () => {
        onChangeFinish(typedValue);
      },
      [typedValue],
      500,
    );

    const handleChange = (e: ChangeEventFor<TElement>) => {
      setTypedValue(e.target.value);
    };

    return (
      <Component {...(props as unknown as TProps)} value={typedValue} onChange={handleChange} />
    );
  };
}
