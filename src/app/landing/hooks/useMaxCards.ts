import { useEffect, useRef, useState } from 'react';

export const useMaxCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxCards, setMaxCards] = useState(0);

  useEffect(() => {
    function calculateMaxCards() {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const cardWidth = window.innerHeight * 0.31;
      const numColumns = Math.floor(containerWidth / cardWidth);
      setMaxCards(numColumns * 2); // fixed number of rows
    }

    calculateMaxCards();
    window.addEventListener('resize', calculateMaxCards);

    return () => {
      window.removeEventListener('resize', calculateMaxCards);
    };
  }, [containerRef, setMaxCards]);

  return [maxCards, containerRef] as const;
};
