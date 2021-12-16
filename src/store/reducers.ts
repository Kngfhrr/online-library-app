import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {addBook, addFavorite, addLibrary, deleteBook} from './actions';

const defaultState = {
    collection: [],
    wishlist: [],
};

const loadLibraryHandler = (state: object, data: { payload: object; }) => {
    return {...state, collection: data.payload}
}


// @ts-ignore
const addBookHandler = (state: any, {payload: {book, id}}) => {
    let updated = [...state.collection]
    const mod = updated.map((item) => {
        if (item.category_name === id) {
            const merged = [...item.collection, book]
            return {...item, collection: merged}
        }
        return item
    })
    return {...state, collection: mod};
};

// @ts-ignore
const addFavoriteHandler = (state: any, {payload: {book}}) => {
    const updated = [...state.wishlist]
    updated.push(book)
    return {...state, wishlist: updated}
}

// @ts-ignore
const deleteBookHandler = (state: any, {payload: {book, id}}) => {
    let updated = [...state.collection]
    const mod = updated.map((item) => {
        if (item.category_name === id) {
            const merged = item.collection.filter((b: any) => b.key !== book.key)
            return {...item, collection: merged}
        }
        return item
    })
    return {...state, collection: mod};
}

const handlers = {
    // @ts-ignore
    [addBook]: addBookHandler,
    // @ts-ignore
    [addLibrary]: loadLibraryHandler,
    // @ts-ignore
    [addFavorite]: addFavoriteHandler,
    // @ts-ignore
    [deleteBook]: deleteBookHandler

};

const libraryReducer = handleActions(handlers, defaultState);

export default combineReducers({
    library: libraryReducer,
});
