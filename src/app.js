import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/index';
import Dashboard from "./Containers/Dashboard/Dashboard";

class App extends React.Component {
    render() {
      return (
          <Provider store={store}>
            <Dashboard></Dashboard>
          </Provider>
      );
    }
}

export default App;

  
  