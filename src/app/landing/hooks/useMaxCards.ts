import { useEffect, useRef, useState } from 'react';

export const useMaxCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const CardHeightRatio = 0.35;
  const gridGapRatio = 0.02;
  const [maxCards, setMaxCards] = useState(0);

  useEffect(() => {
    function calculateMaxCards() {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const cardWidth = window.innerHeight * CardHeightRatio;
      const cardWidthWithGap =
        window.innerHeight * CardHeightRatio + gridGapRatio * window.innerWidth;
      const numColumns = Math.floor(
        (containerWidth - cardWidth) / cardWidthWithGap
      );
      setMaxCards((numColumns + 1) * 2 - 2);
    }

    calculateMaxCards();
    window.addEventListener('resize', calculateMaxCards);

    return () => {
      window.removeEventListener('resize', calculateMaxCards);
    };
  }, [containerRef, setMaxCards]);

  return [maxCards, containerRef] as const;
};
