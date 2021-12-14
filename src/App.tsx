import './index.css'

import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import WishList from "./pages/WishList";
import LayoutComponent from "./components/components/Layout";
import EditableTable from "./pages/Main";


const App: React.FC<{}> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutComponent />}>
                    <Route index element={<EditableTable />} />
                    <Route path="wishlist" element={<WishList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
