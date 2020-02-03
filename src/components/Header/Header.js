import React from 'react';
import {
    Link,
} from 'react-router-dom';
import SearchBtn from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button';
import Movie from '@material-ui/icons/Movie';

const Header = ({ title, setTitle, dispatch, setPage, DEFAULT_PAGE }) => {
  
    const handleChange = () => e => {
        setTitle(e.target.value);
    }
  
    const handleSearchBtn = () => e => {
        e.preventDefault();
        setPage(DEFAULT_PAGE);
        dispatch({ type: 'SEARCH_WITH_TITLE', payload: { title } });
    }

    return (
        <div className="sticky">
            <div className="nav-bar">
                <div className="logo">
                    <Link to="/" onClick={() => setPage(DEFAULT_PAGE)}>
                        <Movie style={{ fontSize: 40, color: '#fff' }} /> 
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
                    <Button variant="contained" color="secondary">
                        <Link to="/auth" className="signin-btn">Sign In</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header;