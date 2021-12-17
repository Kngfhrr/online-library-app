import './index.css'

import React, { useEffect } from 'react'

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

import WishList from './pages/WishList'
import LayoutComponent from './components/Layout'
import EditableTable from './pages/Main'
import { loadState } from './localStorage'
import { initState } from './store/actions'
import { useDispatch } from 'react-redux'
import data from '../test.json'

const App: React.FC<{}> = () => {
    useEffect(() => {
        init()
    }, [])

    const dispatch = useDispatch()

    const init = async () => {
        const state = await loadState()

        if (!state) {
            dispatch(initState({ wishlist: [], collection: data.categories }))
        }

        dispatch(initState(state))
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutComponent />}>
                    <Route path="/" element={<Navigate replace to="/fantasy" />} />
                    <Route path={'/:id'} element={<EditableTable />} />
                    <Route path="wishlist" element={<WishList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
