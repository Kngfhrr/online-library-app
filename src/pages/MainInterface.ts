import React from "react";

export interface Item {
    is_checked: Boolean
    key: string
    name: string
    age: number
    address: string
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: any
    inputType: 'number' | 'text'
    record: Item
    index: number
    is_favorite: boolean
    children: React.ReactNode
}
