import { useAsyncState } from 'react-async-states';

import XLogo from '../../../assets/XLogo.png';
import heart from '../../../assets/heart.png';
import { sponsors } from '../../../utils/constants';
import defaultSelector from '../../../api/selector';
import { footerSource } from './data/sources';
import Spinner from '../../components/Spinner';

function Footer() {
  const {
    state: { responseData: footer, isPending, isSuccess },
  } = useAsyncState({
    lazy: false,
    source: footerSource,
    selector: defaultSelector,
  });
  return (
    <div className="p-2 w-full flex justify-between items-center max-h-[15%]">
      {isPending && (
        <Spinner className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
      )}
      {isSuccess && (
        <>
          <div className="h-full flex-1 pr-[2vw]">
            <div className="flex h-[80%] gap-5 justify-between">
              <div>
                <p className="text-dynamicM text-textOrange mb-4 h-[20%]">
                  Provided by
                </p>
                <img
                  className="max-h-[6vh] object-contain mt-1"
                  src={footer?.logoUrl}
                  alt="Logo"
                />
              </div>
              <div>
                <p className="text-dynamicM text-textOrange mb-4 h-[20%]">
                  Organized By
                </p>
                <img
                  className="max-h-[6vh] object-contain mt-1"
                  src={footer?.coOrganizer}
                  alt="coOrganizer"
                />
              </div>
              <div>
                <p className="text-dynamicM text-textOrange mb-4 h-[20%]">
                  Institutional Partners
                </p>
                <div className="flex gap-1">
                  {footer?.institutionalPartners.map((source, index) => (
                    <img
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="max-h-[6vh] object-contain mt-1"
                      src={source}
                      alt="institutionalPartners"
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-dynamicM text-textOrange mb-4 h-[20%]">
                  Sponsors
                </p>
                <div className="flex h-[80%] gap-5">
                  {Object.entries(sponsors).map(([type, typeName]) => {
                    const sponsorImages = footer?.sponsors?.[type] || [];
                    return (
                      <div key={type}>
                        <div className="flex gap-1 mb-2">
                          {sponsorImages.map((sponsor, index) => (
                            <img
                              // eslint-disable-next-line react/no-array-index-key
                              key={index}
                              className="max-h-[6vh] object-contain mt-1"
                              src={sponsor}
                              alt="sponsor"
                            />
                          ))}
                        </div>
                        <p className="text-dynamicM text-textBlanc mb-4 h-[20%]">
                          {typeName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <p className="flex h-full text-[1.8vw] items-baseline font-['Lato'] ml-auto">
              Made with{' '}
              <img src={heart} alt="" className="w-[2vw] mx-2 relative top-1" />{' '}
              By{' '}
              <img
                src={XLogo}
                alt="logo"
                className="w-[3.8vw] ml-2 relative top-1"
              />
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Footer;
