import axios from 'axios';

export const loadAllBoilerplates = () => {
    return {
        type: 'LOAD_ALL_BOILERPLATES',
    }
}

export const searchBoilerplate = (url = '', tool = '', language = '') => {
    return {
        type: 'SEARCH_BOILERPLATE',
        payload: {tool, language, url}
    }
}

export const activateLoader = () => {
    return {
        type: 'LOADER',
        payload: { loader: true }
    }
}


/**
 * Search repositories on GitHub
 * @param {*} tool 
 * @param {*} language 
 */
export const loadRepositories = async (url, sort = '') => {
    try {
        const sortQs = !sort ? '' : `&sort=${sort}`;
        const request  = await axios.get(`${url}${sortQs}`);

        let repositories = {
            url,
            total_count: request.data.total_count,
            items: []
        };
        // Buid the navigation links
        if ( request.headers.link ) {
            const links = request.headers.link.split(',');
            const nav = {};

            for(const link of links) {
                // Get the exact url
                const linkExtracted = link.match(/<(.*)>/);
                let pageNumber = linkExtracted[1].split('=');
                pageNumber = parseInt(pageNumber[pageNumber.length - 1]);

                if ( link.includes('prev') ) {
                    nav.prev = linkExtracted[1];
                    nav.prevPage = pageNumber;
                }
                if ( link.includes('first') ) {
                    nav.first = linkExtracted[1];
                    nav.firstPage = pageNumber;
                }
                if ( link.includes('next' ) ) {
                    nav.next = linkExtracted[1];
                    nav.nextPage = pageNumber;
                }
                if ( link.includes('last' ) ) {
                    nav.last = linkExtracted[1];
                    nav.lastPage = pageNumber;
                }
                nav.currentPage = !nav.nextPage ? (nav.prevPage + 1) : (nav.nextPage - 1);
                nav.totalPages = !nav.lastPage
                                ? (!nav.prevPage ? 1 : nav.prevPage + 1) 
                                : nav.lastPage;
            }

            repositories = { ...repositories, nav }

        } 
        // Build a simple repos result based on the original
        if ( request.data.items.length > 0 ) {
            for(const repo of request.data.items ) {
                repositories.items.push({
                    full_name: repo.full_name,
                    description: repo.description,
                    url: repo.html_url,
                    language: repo.language,
                    stargazers: repo.stargazers_count,
                    updatedAt: repo.pushed_at
                });
            }
        }

        return repositories;

    } catch(error) {
        console.error(error);
    }
}