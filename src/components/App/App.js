import React, { useState, useReducer } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Main from '../Main/Main';
import Detail from '../Detail/Detail';
import SignIn from '../SignIn/SignIn';
import { reducer } from '../../reducers/reducer';

function App() {
  const [title, setTitle] = useState('');
  const [state, dispatch] = useReducer(reducer, {title: ''});

  const handleChange = () => e => {
    setTitle(e.target.value);
  }

  const handleSearchBtn = () => e => {
    e.preventDefault();
    
    dispatch({ type: 'SEARCH_WITH_TITLE', payload: {title}});
  }

  return (
    <div>
      <Router>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                        <form onSubmit={handleSearchBtn()}>
                          <input type="text" value={title} onChange={handleChange()} placeholder="Search by movie title" />
                          <button type="submit">Submit</button>
                        </form>
                      </li>
                      <li>
                        <Link to="/auth">
                          <button>Sign In</button>
                        </Link>
                      </li>
                  </ul>
              </nav>
          </div>
          <Switch>
              <Route exact path="/">
                <Main searchText={state.title} />
              </Route>
              <Route path="/detail/:id" component={Detail} />
              <Route path="/auth" component={SignIn} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
