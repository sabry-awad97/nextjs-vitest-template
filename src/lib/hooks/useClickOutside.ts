import { RefObject } from 'react';
import useEventListener from './useEventListener';

const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, callback: () => void) => {
  useEventListener(
    'mousedown',
    event => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    ref,
  );
};

export default useClickOutside;
