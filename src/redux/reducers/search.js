
const initialState = { }

const searchReducer = (state = initialState, action) => {
    console.log(action);
    switch ( action.type ) {
        case 'SEARCH_BOILERPLATE':
            return {
                ...state,
                tool: action.payload.tool,
                language: action.payload.language
            }
        default: 
            return state;
    }
}

export default searchReducer;