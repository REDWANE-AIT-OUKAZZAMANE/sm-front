import classNames from 'classnames';

import { testIds } from '../../../../../../tests/constants';
import { Media } from '../../../../../types';
import { contentTypes } from '../../../../../utils/constants';

function AnimatedBackground({ media, type }: { media: Media; type: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform ">
      <img
        className={classNames('h-full w-full object-cover', {
          'background-animation': type === contentTypes.ANIMATED,
        })}
        src={media?.url}
        alt="background-img"
        data-testid={testIds.landing.Card.backgroundImage}
      />
    </div>
  );
}

export default AnimatedBackground;
