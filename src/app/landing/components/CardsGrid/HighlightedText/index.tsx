import { useMemo } from 'react';

import { highlightSymbols } from '../../../../utils/constants';

const HighlightedText = ({ text }) => {
  const words = useMemo(
    () =>
      text.split(' ').map((word: string, index: number) => {
        if (
          word[0] === highlightSymbols.HASHTAG ||
          word[0] === highlightSymbols.MENTION
        ) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <span key={`word-${index}`}>
              <span className="text-textBlue underline">{`${word}`}</span>{' '}
            </span>
          );
        }
        return `${word} `;
      }),
    [text]
  );

  return <div>{words}</div>;
};

export default HighlightedText;
