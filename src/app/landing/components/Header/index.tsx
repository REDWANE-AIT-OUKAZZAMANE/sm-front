import { useAsyncState } from 'react-async-states';

import defaultSelector from '../../../../api/selector';
import IGIcon from '../../../../assets/icons/ig-white.svg';
import YoutubeIcon from '../../../../assets/icons/yt-white.svg';
import Spinner from '../Spinner';
import { getWallSettingsProducer } from '../../../backoffice/data/producers/getWallSettingsProducer';

function Header() {
  const {
    state: { responseData: headerData, isPending, isSuccess },
  } = useAsyncState({
    lazy: false,
    producer: getWallSettingsProducer,
    selector: defaultSelector,
  });
  return (
    <div className="flex items-center justify-between">
      {isPending && (
        <Spinner className="mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" />
      )}
      {isSuccess && (
        <>
          <img
            className="max-h-sm h-[8vh]"
            src={headerData.data?.logoBase64}
            alt="logo"
          />
          <div className="text-3xl">
            <span className="font-semibold">{headerData.data?.title}</span>

            <div className="mt-2 flex items-center space-x-4">
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
