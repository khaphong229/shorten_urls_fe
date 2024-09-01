import React, { useEffect, useState, useCallback } from 'react';
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
} from 'react-router-dom';
import BoxComponent from '../components/BoxComponent';
import { Space, Input, Divider, Button, Table, Tag, notification } from 'antd';
import AddApiLink from './AddApiLink';
import {
    getAllApiKey,
    editStatusApiKey,
    deleteApiKey,
} from '../services/apiKey';
import { BulbOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

function ApiLink() {
    const [apiKeys, setApiKeys] = useState([]);
    const { updateBreadcrumb } = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    const deleteApi = useCallback(async (route) => {
        try {
            const res = await deleteApiKey(route);
            if (res.data.success) {
                notification.success({
                    message: 'Thành công',
                    description: 'Xóa thành công',
                });
                fetchApiKey();
            } else {
                notification.warning({
                    message: 'Thất bại',
                    description: res.data.message,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng thử lại',
            });
        }
    }, []);

    const editStatus = useCallback(async (route, data) => {
        try {
            const res = await editStatusApiKey(route, data);
            if (res.data.success) {
                notification.success({
                    message: 'Thành công',
                    description: 'Cập nhật trạng thái thành công',
                });
                fetchApiKey();
            } else {
                notification.warning({
                    message: 'Thất bại',
                    description: res.data.message,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng thử lại',
            });
        }
    }, []);

    const columns = [
        {
            title: 'Tên API',
            dataIndex: 'name_api',
            key: 'name_api',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Lượt xem tối đa',
            dataIndex: 'maximum_view',
            key: 'maximum_view',
        },
        {
            title: 'Đô ưu tiên',
            dataIndex: 'priority',
            key: 'priority',
        },
        {
            title: 'Trạng thái',
            key: 'is_active',
            dataIndex: 'is_active',
            render: (is_active) => {
                let color = is_active ? 'green' : 'volcano';
                let tag = is_active ? 'Hoạt động' : 'Không hoạt động';
                return <Tag color={color}>{tag.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tag
                        color="cyan"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            editStatus(`/apikeys/${record.key}`, {
                                is_active: !record.is_active,
                            });
                        }}
                    >
                        <BulbOutlined />
                    </Tag>
                    <Tag color="purple">
                        <Link to={`/link/edit/${record.key}`}>
                            <EditOutlined />
                        </Link>
                    </Tag>
                    <Tag color="red">
                        <DeleteOutlined
                            onClick={() => {
                                deleteApi(`/apikeys/${record.key}`);
                            }}
                        />
                    </Tag>
                </Space>
            ),
        },
    ];

    const fetchApiKey = async () => {
        try {
            const res = await getAllApiKey();
            if (res.data.success) {
                setApiKeys(res.data.data);
            } else {
                notification.warning({
                    message: 'Lấy danh sách API thất bại',
                    description: res.data.message,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Lấy danh sách API lỗi',
                description: 'Vui lòng thử lại bạn nhé',
            });
        }
    };

    useEffect(() => {
        fetchApiKey();
    }, []);

    useEffect(() => {
        const path = location.pathname;
        if (path === '/link') {
            updateBreadcrumb([
                {
                    route: '/link',
                    name: 'Danh sách web quản lý api link',
                },
            ]);
        } else if (path.includes('/link/add')) {
            updateBreadcrumb([
                {
                    route: '/link',
                    name: 'Danh sách web quản lý api link',
                },
                {
                    route: '/link/add',
                    name: 'Thêm API Link',
                },
            ]);
        }
    }, [updateBreadcrumb, location]);

    const handleAdd = () => {
        return navigate('/link/add');
    };

    const data = apiKeys.map((item) => ({
        key: item.api_key_id,
        name_api: item.name_api,
        maximum_view: item.maximum_view,
        priority: item.priority,
        is_active: item.is_active,
    }));

    return (
        <>
            <Outlet context={{ updateBreadcrumb }} />
            {location.pathname === '/link' && (
                <>
                    <BoxComponent>
                        <p className="mb-5">Danh sách website rút gọn</p>
                        <div className="flex justify-between">
                            <Search
                                placeholder="Nhập API website bạn muốn tìm"
                                onSearch={onSearch}
                                enterButton
                                className="flex-initial w-64"
                            />
                            <Button
                                type="primary"
                                className="flex-none"
                                onClick={handleAdd}
                            >
                                Thêm
                            </Button>
                        </div>
                    </BoxComponent>
                    <Divider />
                    <BoxComponent>
                        <Table
                            columns={columns}
                            dataSource={data}
                            rowKey="key"
                        />
                    </BoxComponent>
                </>
            )}
        </>
    );
}

export default ApiLink;
