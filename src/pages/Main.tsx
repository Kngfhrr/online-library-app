import '../index.css'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { StarTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { addBook, addFavorite, deleteBook, editBook } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { Item } from './MainInterface'
import { EditableCell } from '../components/TableElements'

import {
    Table,
    Input,
    InputNumber,
    Popconfirm,
    Form,
    Typography,
    Button,
} from 'antd'
import { generateId } from '../helpers'

const EditableTable = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const categories = useSelector((state: any) => state.library.collection)

    const [form] = Form.useForm()
    const [form_secondary] = Form.useForm()

    const [editingKey, setEditingKey] = useState('')

    const current = categories.find(
        (item: any) => item.category_name === (id || 'fantasy')
    )

    const isEditing = (record: Item) => record.key === editingKey

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', year_written: '', ...record })
        setEditingKey(record.key)
    }

    const cancel = () => {
        setEditingKey('')
    }

    const add = async (data: any) => {
        try {
            await dispatch(
                addBook({
                    book: {
                        key: generateId(),
                        title: data.title,
                        author: data.author,
                        year_written: data.year,
                    },
                    id,
                })
            )
        } catch (e) {
            console.log('e', e)
        }
    }

    const save = async (key: React.Key) => {
        const row = (await form.validateFields()) as Item
        dispatch(editBook({ book: { ...row, key: key }, id }))
        setEditingKey('')
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: '25%',
            editable: true,
            sorter: (
                a: { title: string | any[] },
                b: { title: string | any[] }
            ) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Author',
            dataIndex: 'author',
            width: '15%',
            editable: true,
        },
        {
            title: 'Year written',
            dataIndex: 'year_written',
            width: '40%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record)
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Typography.Link>
                        <StarTwoTone
                            onClick={() =>
                                dispatch(addFavorite({ book: record, id }))
                            }
                            twoToneColor={
                                record.is_checked ? '#2C8DFC' : '#BBBBBB'
                            }
                            style={{ marginLeft: 30, fontSize: 20 }}
                        />
                        <CloseCircleTwoTone
                            twoToneColor="#ccc"
                            style={{ marginLeft: 30, fontSize: 20 }}
                            onClick={() =>
                                dispatch(deleteBook({ book: record, id }))
                            }
                        />
                    </>
                )
            },
        },
    ]
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    })

    return (
        <>
            <Form
                style={{ marginBottom: 20 }}
                form={form_secondary}
                name="horizontal_login"
                layout="inline"
                onFinish={add}
            >
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Please input title!' }]}
                >
                    <Input type="text" placeholder="Title" />
                </Form.Item>
                <Form.Item
                    name="author"
                    rules={[
                        { required: true, message: 'Please input author!' },
                    ]}
                >
                    <Input type="text" placeholder="Author" />
                </Form.Item>
                <Form.Item
                    name={'year'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input year written!',
                        },
                    ]}
                >
                    <InputNumber placeholder="Year writtem" />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form_secondary.isFieldsTouched(true) ||
                                !!form_secondary
                                    .getFieldsError()
                                    .filter(({ errors }) => errors.length)
                                    .length
                            }
                        >
                            Add
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <Form form={form}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={current?.collection}
                    // @ts-ignore
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </>
    )
}
export default EditableTable
