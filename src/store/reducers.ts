import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {addBook, addFavorite, addLibrary, deleteBook, editBook, initState} from './actions';

const defaultState = {
    collection: [],
    wishlist: [],
};


// @ts-ignore
const initStateHandler = (state: any, {payload: {collection, wishlist}}) => {
    return {...state, collection: collection, wishlist: wishlist}
}

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
const addFavoriteHandler = (state: any, {payload: {book, id}}) => {
    const collection = [...state.collection]
    let wishlist = [...state.wishlist]

    const found_category = collection.find((x: any) => x.category_name === id)
    found_category.collection = found_category.collection.map((b: any) => {

        if (b.key === book.key) {
            if (b.is_checked) {
                wishlist.splice(wishlist.findIndex((i) => {
                    i.key === b.key
                }), 1)
                return {...b, is_checked: false}
            } else {
                wishlist = [...wishlist, b]
                return {...b, is_checked: true}
            }
        }
        return b
    })
    return {...state, wishlist, collection}
}

// @ts-ignore
const deleteBookHandler = (state: any, {payload: {book, id}}) => {
    let updated_collection = [...state.collection]
    let updated_wishlist = [...state.wishlist]
    updated_collection = updated_collection.map((item) => {
        if (item.category_name === id) {
            const deleted = item.collection.filter((b: any) => b.key !== book.key)
            return {...item, collection: deleted}
        }
        return item
    })

    updated_wishlist = updated_wishlist.filter((b: any) => b.key !== book.key)

    return {...state, collection: updated_collection, wishlist: updated_wishlist};
}

// @ts-ignore
const editBookHandler = (state: any, {payload: {book, id}}) => {
    let updated = [...state.collection]
    updated = updated.map((item) => {
        if (item.category_name === id) {
            console.log('ITEM', item)
            const index = item.collection.findIndex((i: any) => i.key === book.key)
            item.collection[index] = book
            return {...item}
        }
        return item
    })
    return {...state, updated};
};

const handlers = {
    // @ts-ignore
    [addBook]: addBookHandler,
    // @ts-ignore
    [addLibrary]: loadLibraryHandler,
    // @ts-ignore
    [addFavorite]: addFavoriteHandler,
    // @ts-ignore
    [deleteBook]: deleteBookHandler,
    // @ts-ignore
    [initState]: initStateHandler,
    // @ts-ignore
    [editBook]: editBookHandler
};

const libraryReducer = handleActions(handlers, defaultState);

export default combineReducers({
    library: libraryReducer,
});
