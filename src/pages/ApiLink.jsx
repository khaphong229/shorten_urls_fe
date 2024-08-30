import React, { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import BoxComponent from '../components/BoxComponent';
import { Space, Input, Divider, Button, Table, Tag } from 'antd';

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
  {
    title: 'Tên API',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Lượt xem tối đa',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Đô ưu tiên',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Trạng thái',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function ApiLink() {
    const { updateBreadcrumb } = useOutletContext();

    useEffect(() => {
        updateBreadcrumb([
            {
                route: '/link',
                name: 'Danh sách web quản lý api link',
            },
        ]);
    }, [updateBreadcrumb]);

    return (
        <>
            <Outlet context={{ updateBreadcrumb }}/>
            <BoxComponent>
                <p className='mb-5'>Danh sách website rút gọn</p>
                <div className='flex justify-between'>
                    <Search placeholder="Nhập API website bạn muốn tìm" onSearch={onSearch} enterButton className='flex-initial w-64'/>
                    <Button type="primary" className='flex-none'>Thêm</Button>
                </div>
            </BoxComponent>
            <Divider/>
            <BoxComponent>
                <Table columns={columns} dataSource={data} />
            </BoxComponent>
        </>
    )
}

export default ApiLink;

