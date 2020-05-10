export const loadAllBoilerplates = () => {
    return {
        type: 'LOAD_ALL_BOILERPLATES',
    }
}

export const searchBoilerplate = (tool, language) => {
    return {
        type: 'SEARCH_BOILERPLATE',
        payload: {tool, language}
    }
}

export const activateLoader = () => {
    return {
        type: 'LOADER',
        payload: { loader: true }
    }
}