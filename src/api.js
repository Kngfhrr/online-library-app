import data from '../test.json'

const library = localStorage.getItem('library')


export async function init() {
    if(library) {
        return JSON.parse(library)
    }
    return data.categories
}
