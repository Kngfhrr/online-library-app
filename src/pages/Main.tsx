import '../index.css'
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {StarTwoTone, CloseCircleTwoTone} from '@ant-design/icons';
import {addBook, addLibrary, addFavorite, deleteBook} from '../store/actions';
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {Table, Input, InputNumber, Popconfirm, Form, Typography, Button} from 'antd';

import {init} from "../api";


interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    is_favorite: boolean;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       is_favorite,
                                                       ...restProps
                                                   }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;


    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = (props: any) => {

        const {id} = useParams();
        const dispatch = useDispatch()

        const cat = useSelector((state: any) => state.library.collection, shallowEqual)

        const [form] = Form.useForm();
        const [form_secondary] = Form.useForm()

        const [editingKey, setEditingKey] = useState('');


        useEffect(() => {
            loadLibrary()
        }, [shallowEqual])


        const loadLibrary = async () => {
            try {
                const res = await init()
                dispatch(addLibrary(res))
            } catch (e) {
                console.log('e', e)
            }
        }

        const current = cat.find((item: any) => item.category_name === id)

        const isEditing = (record: Item) => record.key === editingKey;

        const edit = (record: Partial<Item> & { key: React.Key }) => {
            form.setFieldsValue({name: '', age: '', year_written: '', ...record});
            setEditingKey(record.key);
        };

        const cancel = () => {
            setEditingKey('');
        };


        const add = async (data: any) => {
            try {
                await dispatch(addBook(
                    {
                        book: {
                            key: cat.length + 1,
                            title: data.title,
                            author: data.author,
                            year_written: data.year,
                        }, id
                    }))
            } catch (e) {
                console.log('e', e)
            }
        }

        const save = async (key: React.Key) => {
            try {
                const row = (await form.validateFields()) as Item;

                const newData = [...props.data.collection[id || 'fantasy']];
                const index = newData.findIndex(item => key === item.key);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    setEditingKey('');
                } else {
                    newData.push(row);
                    // setData(newData);
                    props.addLibrary(newData)
                    setEditingKey('');
                }
            } catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
        };

        const columns = [
                {
                    title: 'Title',
                    dataIndex: 'title',
                    width: '25%',
                    editable: true,
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
                        const editable = isEditing(record);
                        return editable ? (
                            <span>
            <Typography.Link onClick={() => save(record.key)} style={{marginRight: 8}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                        ) : (
                            <>
                                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    Edit
                                </Typography.Link>
                                <StarTwoTone
                                    onClick={() => dispatch(addFavorite({book: record}))}
                                    twoToneColor={true ? '#2C8DFC' : '#BBBBBB'}
                                    style={{marginLeft: 30, fontSize: 20}}/>
                                <CloseCircleTwoTone
                                    twoToneColor='#ccc'
                                    style={{marginLeft: 30, fontSize: 20}}
                                    onClick={() => dispatch(deleteBook({book: record, id}))}/>
                            </>

                        );
                    },
                },
            ]
        ;

        const mergedColumns = columns.map(col => {
            if (!col.editable) {
                return col;
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
            };
        });

        return (
            <>
                <Form style={{marginBottom: 20}} form={form_secondary} name="horizontal_login" layout="inline"
                      onFinish={add}>
                    <Form.Item
                        name="title"
                        rules={[{required: true, message: 'Please input title!'}]}
                    >
                        <Input
                            type="text"
                            placeholder="Title"
                        />
                    </Form.Item>
                    <Form.Item
                        name="author"
                        rules={[{required: true, message: 'Please input author!'}]}
                    >
                        <Input
                            type="text"
                            placeholder="Author"
                        />
                    </Form.Item>
                    <Form.Item
                        name={'year'}
                        rules={[{required: true, message: 'Please input year written!'}]}
                    >
                        <InputNumber placeholder='Year writtem'/>
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !form_secondary.isFieldsTouched(true) ||
                                    !!form_secondary.getFieldsError().filter(({errors}) => errors.length).length
                                }
                            >
                                Add
                            </Button>
                        )}
                    </Form.Item>
                </Form>
                <Form form={form} component={false}>

                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={current?.collection}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            </>

        );
    }
;

export default EditableTable
