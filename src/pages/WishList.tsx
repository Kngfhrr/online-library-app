import React, {useEffect, useState} from "react";
import { Table } from 'antd';
import { useSelector} from 'react-redux'



const WishList: React.FC<{}> = () => {

    const wishlist = useSelector((state:any) => state.library.wishlist)

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: '30%',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Written year',
            dataIndex: 'year_written',
            width: '40%',
        },
    ];


    return <Table columns={columns} dataSource={wishlist} />
}


export default WishList
