import { useIntersection } from 'react-use';

export const useSafeIntersection = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: IntersectionObserverInit
) => {
  return useIntersection(ref as React.RefObject<HTMLElement>, options);
};
