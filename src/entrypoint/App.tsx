import { useAsyncState, Status } from 'react-async-states';

import Wall from '../front-office';
import { stompClientSource } from '../front-office/data/sources/ClientSource';

const App = () => {
  const { state } = useAsyncState.auto(stompClientSource);

  return (
    <div className="bg-darkBlue min-h-screen w-screen ">
      {state.status === Status.success && <Wall />}
    </div>
  );
};

export default App;
