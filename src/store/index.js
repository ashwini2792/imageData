import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from "redux";
import appReducer from './reducers/AppReducer';
import rootSaga from './sagas/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export const store = createStore(
  appReducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)

// render the application