import React, { useState, useEffect } from 'react';
import {
    Link,
} from 'react-router-dom';
import SearchBtn from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button';
import Movie from '@material-ui/icons/Movie';

const Header = ({ title, setTitle, dispatch, setPage, DEFAULT_PAGE, token, setToken }) => {

    useEffect(() => {
        setToken(window.sessionStorage.getItem('token'));
        return () => {
            setToken('')
        }
    }, [ window.sessionStorage.getItem('token') ])
  
    const handleChange = () => e => {
        setTitle(e.target.value);
    }
  
    const handleSearchBtn = () => e => {
        e.preventDefault();
        setPage(DEFAULT_PAGE);
        dispatch({ type: 'SEARCH_WITH_TITLE', payload: { title } });
    }

    const signOut = () => {
        window.sessionStorage.removeItem('token');
        setToken('');
    }

    return (
        <div className="sticky">
            <div className="nav-bar">
                <div className="logo">
                    <Link to="/" onClick={() => setPage(DEFAULT_PAGE)}>
                        <Movie style={{ fontSize: 40, color: 'gold' }} /> 
                        <div>Manny Movies</div>
                    </Link>
                </div>
                <div>
                    <form className="search-form" onSubmit={handleSearchBtn()}>
                        <input 
                            className="search-box" 
                            type="text" 
                            value={title} 
                            onChange={handleChange()} 
                            placeholder="Search by movie title" 
                        />
                        <button className="search-btn" type="submit">
                            <SearchBtn style={{ fontSize: 30, color: '#000', opacity: 0.5 }} />
                        </button>
                    </form>
                </div>
                <div className="empty-space"></div>
                <div className="signin-btn-container">
                    {
                        token === '' || token === null || token === undefined?
                        <Button variant="contained" color="secondary">
                            <Link to="/auth" className="signin-btn">Sign In</Link>
                        </Button>
                        :
                        <div>
                            <button>Watchlist</button>
                            <Button variant="contained" color="default" onClick={signOut}>
                                Sign Out
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;