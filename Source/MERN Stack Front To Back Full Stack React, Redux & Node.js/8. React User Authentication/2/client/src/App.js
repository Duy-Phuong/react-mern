import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import setAuthToken from '../src/utils/setAuthToken';
import { loadUser } from './actions/auth';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className='container'>
            <Alert></Alert>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
