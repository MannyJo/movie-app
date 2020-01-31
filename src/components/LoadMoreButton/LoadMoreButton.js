import React from 'react';

const LoadMoreButton = ({ loadMore }) => {
    return (
        <div>
            <button onClick={loadMore}>Load More</button>
        </div>
    )
}

export default LoadMoreButton;