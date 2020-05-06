import axios from 'axios';

/**
 * Search repositories on GitHub
 * @param {*} tool 
 * @param {*} language 
 */
const searchBoilerplate = async (url, sort = '') => {
    console.log(url);
    try {
        const sortQs = !sort ? '' : `&sort=${sort}`;
        const request  = await axios.get(`${url}${sortQs}`);

        const repositories = {
            total_count: request.data.total_count,
            items: []
        };
        // Buid the navigation links
        if ( request.headers.link ) {
            const links = request.headers.link.split(',');

            for(const link of links) {
                // Get the exact url
                const linkExtracted = link.match(/<(.*?)>/);

                if ( link.includes('prev') ) {
                    repositories.navPrev = linkExtracted[1];
                }
                if ( link.includes('first') ) {
                    repositories.navFirst = linkExtracted[1];
                }
                if ( link.includes('next' ) ) {
                    repositories.navNext = linkExtracted[1];
                }
                if ( link.includes('last' ) ) {
                    repositories.navLast = linkExtracted[1];
                }
            }

        } 
        // Build a simple repos result based on the original
        if ( request.data.items.length > 0 ) {
            for(const repo of request.data.items ) {
                repositories.items.push({
                    full_name: repo.full_name,
                    description: repo.description,
                    url: repo.html_url,
                    language: repo.language,
                    stargazers: repo.stargazers_count
                });
            }
        }

        return repositories;

    } catch(error) {
        console.log(error);
    }
}

const initialState = {
    repositories: []
 }

 const searchReducer = (state = initialState, action) => {
     let url = 'https://api.github.com/search/repositories?q=boilerplate&per_page=15';
     let repositories = searchBoilerplate(url);

     switch ( action.type ) {
         case 'LOAD_ALL_BOILERPLATES':
             return {
                 ...state,
                 repositories
             }

        case 'SEARCH_BOILERPLATE':
            const tool = action.payload.tool;
            const language = action.payload.language;
            const languageQs = !language ? '' : `language:${encodeURIComponent(language)}`;
            const toolQs = !tool ? '' : `${tool}+`;
            url = `https://api.github.com/search/repositories?q=${toolQs}boilerplate+${languageQs}&per_page=15`;
            repositories = searchBoilerplate(url);

            return {
                ...state,
                repositories,
                tool,
                language,
            }
        default: 
            return state;
    }
}

export default searchReducer;