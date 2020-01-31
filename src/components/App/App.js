import React, { useState, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Detail from '../Detail/Detail';
import SignIn from '../SignIn/SignIn';
import { reducer } from '../../reducers/reducer';

function App() {
  const DEFAULT_PAGE = 1;
  const initTitle = { title: '' };
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [state, dispatch] = useReducer(reducer, initTitle);

  return (
    <div>
      <Router>
        <Header 
          title={title} 
          setTitle={setTitle} 
          dispatch={dispatch} 
          setPage={setPage} 
        />
        <Switch>
          <Route exact path="/">
            <Main 
              searchText={state.title} 
              setTitle={setTitle} 
              dispatch={dispatch} 
              page={page} 
              setPage={setPage} 
              DEFAULT_PAGE={DEFAULT_PAGE} 
            />
          </Route>
          <Route path="/detail/:id" component={Detail} />
          <Route path="/auth" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
