import React, { useState } from 'react';
import {
    Link,
} from 'react-router-dom';

const Header = ({ title, setTitle, dispatch, setPage }) => {
  
    const handleChange = () => e => {
        setTitle(e.target.value);
    }
  
    const handleSearchBtn = () => e => {
        e.preventDefault();
        setPage(1);
        dispatch({ type: 'SEARCH_WITH_TITLE', payload: { title } });
    }

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/" onClick={() => setPage(1)}>Home</Link>
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
    )
}

export default Header;