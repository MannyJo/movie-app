import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Main from '../Main/Main';
import Detail from '../Detail/Detail';

const Nav = () => {
    return (
        <Router>
            <div>
                {/* <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav> */}
            </div>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/detail/:id" component={Detail} />
            </Switch>
        </Router>
    )
}

export default Nav;