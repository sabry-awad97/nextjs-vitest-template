import { useEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
  const mediaQueryList = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQueryList.matches);

  useEffect(() => {
    const initialMatch = mediaQueryList.matches;
    setMatches(initialMatch);
  }, [mediaQueryList.matches]);

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [mediaQueryList]);

  return matches;
};

export default useMediaQuery;
