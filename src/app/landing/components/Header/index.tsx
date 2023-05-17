import { useAsyncState } from 'react-async-states';

import defaultSelector from '../../../../api/selector';
import { headerSource } from './data/sources';
import IGIcon from '../../../../assets/icons/ig-white.svg';
import YoutubeIcon from '../../../../assets/icons/yt-white.svg';
import Spinner from '../Spinner';

function Header() {
  const {
    state: { responseData: header, isPending, isSuccess },
  } = useAsyncState({
    lazy: false,
    source: headerSource,
    selector: defaultSelector,
  });
  return (
    <div className="flex items-center justify-between">
      {isPending && (
        <Spinner className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
      )}
      {isSuccess && (
        <>
          <img className="h-[8vh] max-h-sm" src={header?.logoUrl} alt="logo" />
          <div className="text-3xl">
            <span className="font-semibold">{header?.title}</span>

            <div className="flex items-center space-x-4 mt-2">
              <img className="w-7" src={IGIcon} alt="instagram icon" />
              <img className="w-12" src={YoutubeIcon} alt="youtube icon" />
              <p className="ml-7">Join us live</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
