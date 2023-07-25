import { useAsyncState } from 'react-async-states';

import XLogo from '../../../../assets/XLogo.png';
import heart from '../../../../assets/heart.png';
import { sponsors } from '../../../utils/constants';
import defaultSelector from '../../../../api/selector';
import { footerSource } from './data/sources';
import Spinner from '../Spinner';
import { testIds } from '../../../../tests/constants';

function Footer() {
  const {
    state: { responseData: footerData, isPending, isSuccess },
  } = useAsyncState({
    lazy: false,
    source: footerSource,
    selector: defaultSelector,
  });
  return (
    <div className="flex max-h-[15%] w-full items-center justify-between p-2">
      {isPending && (
        <Spinner
          data_testid={testIds.frontoffice.footer.loader}
          className="mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
        />
      )}
      {isSuccess && (
        <>
          <div className="h-full flex-1 pr-[2vw]">
            <div className="flex h-[80%] justify-between gap-5">
              <div>
                <p className="mb-4 h-[20%] text-dynamicM text-textOrange">
                  Provided by
                </p>
                <img
                  className="mt-1 max-h-[6vh] object-contain"
                  src={footerData?.logoUrl}
                  data-testid={testIds.frontoffice.footer.logo}
                  alt="Logo"
                />
              </div>
              <div>
                <p className="mb-4 h-[20%] text-dynamicM text-textOrange">
                  Organized By
                </p>
                <img
                  className="mt-1 max-h-[6vh] object-contain"
                  src={footerData?.coOrganizer}
                  data-testid={testIds.frontoffice.footer.coOrganizer}
                  alt="coOrganizer"
                />
              </div>
              <div>
                <p className="mb-4 h-[20%] text-dynamicM text-textOrange">
                  Institutional Partners
                </p>
                <div
                  data-testid={testIds.frontoffice.footer.institutionalPartners}
                  className="flex gap-1"
                >
                  {footerData?.institutionalPartners.map((source, index) => (
                    <img
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="mt-1 max-h-[6vh] overflow-hidden object-contain"
                      src={source}
                      alt="institutionalPartners"
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 h-[20%] text-dynamicM text-textOrange">
                  Sponsors
                </p>
                <div
                  data-testid={testIds.frontoffice.footer.sponsors}
                  className="flex h-[80%] gap-5"
                >
                  {Object.entries(sponsors).map(([type, typeName]) => {
                    const sponsorImages = footerData?.sponsors?.[type] || [];
                    return (
                      <div key={type}>
                        <div className="mb-2 flex gap-1">
                          {sponsorImages.map((sponsor, index) => (
                            <img
                              // eslint-disable-next-line react/no-array-index-key
                              key={index}
                              className="mt-1 max-h-[6vh] overflow-hidden object-contain"
                              src={sponsor}
                              alt="sponsor"
                            />
                          ))}
                        </div>
                        <p className="text-textBlanc mb-4 h-[20%] text-dynamicM">
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
            <p className="ml-auto flex h-full items-baseline font-['Lato'] text-[1.8vw]">
              Made with{' '}
              <img src={heart} alt="" className="relative top-1 mx-2 w-[2vw]" />{' '}
              By{' '}
              <img
                src={XLogo}
                alt="logo"
                className="relative top-1 ml-2 w-[3.8vw]"
              />
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Footer;
