import { Fragment } from "react";
import { DbState } from './context/db/DbState'
import Home from './pages/Home'

function App() {
  return (
    <Fragment>
      <DbState>
        <Home />
      </DbState>
    </Fragment>
  );
}

export default App;
