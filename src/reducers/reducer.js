export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_WITH_TITLE':
            return action.payload;
        default:
            return state;
    }
}