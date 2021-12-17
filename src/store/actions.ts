import { createAction } from 'redux-actions';

export const addBook = createAction('BOOK_ADD');

export const addLibrary = createAction('LIBRARY_ADD');

export const editBook = createAction('BOOK_EDIT')

export const addFavorite = createAction('ADD_FAVORITE')

export const deleteBook = createAction('DELETE_BOOK')

export const initState = createAction('INIT_STATE')
