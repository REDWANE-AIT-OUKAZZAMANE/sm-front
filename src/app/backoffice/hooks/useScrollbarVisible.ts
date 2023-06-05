import { Status } from 'async-states';
import { useEffect, useState, RefObject, useCallback } from 'react';

export const useScrollbarVisible = (
  containerRef: RefObject<HTMLDivElement>,
  containerFetchingStatus: Status
) => {
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const checkScrollbarVisibility = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      setScrollbarVisible(container.scrollHeight > container.clientHeight);
    }
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener('resize', checkScrollbarVisibility);

    return () => {
      window.removeEventListener('resize', checkScrollbarVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Run the check initially when fetching is done to see wether the data is scrollable
    checkScrollbarVisibility();
  }, [checkScrollbarVisibility, containerFetchingStatus]);

  return scrollbarVisible;
};
