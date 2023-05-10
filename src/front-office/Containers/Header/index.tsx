import { useAsyncState } from 'react-async-states';

import defaultSelector from './data/selector';
import { headerSource } from './data/sources';
import { socialMediaIcons } from '../../../utils/constants.js';

function Header() {
  const {
    state: { header, isPending, isSuccess },
  } = useAsyncState({
    lazy: false,
    source: headerSource,
    selector: defaultSelector,
  });

  return (
    <>
      {isPending && <h4>Loading...</h4>}
      {isSuccess && header && (
        <div className="flex items-center justify-between">
          <img className="w-[20vw] max-w-sm" src={header.logoUrl} alt="logo" />

          <div className="text-2xl">
            <span className="font-semibold">{header.hashtags[0]}, </span>
            <span className="font-semibold">{header.mention}</span>

            <div className="flex items-center space-x-4 mt-2">
              {header.sources?.map((source) => (
                <img
                  className="w-7"
                  key={source}
                  src={socialMediaIcons[source].colorHeader}
                  alt={source}
                />
              ))}

              <p className="ml-7">"Join us live"</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
