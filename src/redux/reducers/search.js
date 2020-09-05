import { loadRepositories } from '../actions/search';


/**
 * Buld the url queries string
 * @param {*} tool :: Boilerplate Tool
 * @param {*} language :: Programming language
 * @param {*} page :: Page number
 */
const buildUrl = (url = '', tool = '', language = '', page = '') => {
    const languageQs = !language ? '' : `+language:${encodeURIComponent(language)}`;
    const toolQs = !tool ? '' : `${tool}+`;
    const pageQs = !page ? '' : `&page=${page}`;
    return `https://api.github.com/search/repositories?q=${toolQs}boilerplate${languageQs}&per_page=30${pageQs}`;
}

const initialState = {
    repositories: {},
    loader: true
 }

 const searchReducer = (state = initialState, action) => {
     let url = buildUrl();
     let repositories = loadRepositories(url);

     switch ( action.type ) {
         case 'LOADER':
             return {
                 loader: action.payload.loader,
             }
         case 'LOAD_ALL_BOILERPLATES':
             return {
                 ...state,
                 repositories,
                 loader: false
             }

        case 'SEARCH_BOILERPLATE':
            const tool = action.payload.tool;
            const language = action.payload.language;
            const page = action.payload.page;
            url = !action.payload.url ? buildUrl(url, tool, language, page) : action.payload.url;
            repositories = loadRepositories(url);

            return {
                ...state,
                repositories,
                tool,
                language,
                loader: false
            }
        default: 
            return state;
    }
}

export default searchReducer;