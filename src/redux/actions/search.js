export const searchBoilerplate = (tool, language) => {
    return {
        type: 'SEARCH_BOILERPLATE',
        payload: {tool, language}
    }
}