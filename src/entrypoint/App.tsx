import { useAsyncState, Status } from 'react-async-states';

import Wall from '../front-office';
import { stompClientSource } from '../front-office/data/sources/ClientSource';
import Spinner from '../front-office/components/Spinner';

const App = () => {
  const { state } = useAsyncState.auto(stompClientSource);

  return (
    <div className="bg-darkBlue min-h-screen w-screen ">
      {state.status === Status.success && <Wall />}
      {state.status === Status.pending && (
        <div className="grid h-screen place-content-center">
          <Spinner className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
        </div>
      )}
    </div>
  );
};

export default App;
