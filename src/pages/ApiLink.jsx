import React, { useEffect, useState, useCallback } from 'react';
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
} from 'react-router-dom';
import {
    Space,
    Input,
    Divider,
    Button,
    Table,
    Tag,
    notification,
    Spin,
    Popconfirm,
} from 'antd';
import { BulbOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import BoxComponent from '../components/BoxComponent';
import {
    getAllApiKey,
    editStatusApiKey,
    deleteApiKey,
    searchApiKey,
} from '../services/apiKey';
import {displayStatus} from '../services/notification'
const { Search } = Input;

function ApiLink() {
    const [apiKeys, setApiKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const { updateBreadcrumb } = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchApiKey();
        updateBreadcrumbBasedOnPath();
    }, [location]);

    const fetchApiKey = async () => {
        setLoading(true);
        try {
            const res = await getAllApiKey();
            if (res.data.success) {
                setTimeout(() => {
                    setApiKeys(res.data.data);
                    setLoading(false);
                }, 500);
            } else {
                displayStatus('warning', res.data.message);
                setLoading(false);
            }
        } catch (error) {
            displayStatus('error', 'Vui lòng thử lại bạn nhé');
            setLoading(false);
        }
    };

    const onSearch = async (value) => {
        setLoading(true);
        try {
            const res = await searchApiKey(value);
            if (res.data.success) {
                setTimeout(() => {
                    setApiKeys(res.data.data);
                    setLoading(false);
                }, 500);
            } else {
                displayStatus('warning', 'Tìm kiếm thất bại');
                setLoading(false);
            }
        } catch (error) {
            displayStatus('error', 'Lỗi trong quá trình tìm kiếm');
            setLoading(false);
        }
    };

    const deleteApi = useCallback(async (route) => {
        try {
            const res = await deleteApiKey(route);
            if (res.data.success) {
                displayStatus('success', 'Xóa thành công');
                fetchApiKey();
            } else {
                displayStatus('warning', res.data.message);
            }
        } catch (error) {
            displayStatus('error', 'Vui lòng thử lại');
        }
    }, []);

    const editStatus = useCallback(async (route, data) => {
        try {
            const res = await editStatusApiKey(route, data);
            if (res.data.success) {
                displayStatus(
                    'success',
                    'Cập nhật trạng thái thành công',
                );
                fetchApiKey();
            } else {
                displayStatus('warning', res.data.message);
            }
        } catch (error) {
            displayStatus('error', 'Vui lòng thử lại');
        }
    }, []);


    const updateBreadcrumbBasedOnPath = () => {
        const path = location.pathname;
        const breadcrumbData = [
            {
                route: '/link',
                name: 'Danh sách web quản lý api link',
            },
        ];

        if (path.includes('/link/add')) {
            breadcrumbData.push({
                route: '/link/add',
                name: 'Thêm API Link',
            });
        } else if (path.includes('/link/edit')) {
            breadcrumbData.push({
                route: '/link/edit',
                name: 'Cập nhật api link',
            });
        }

        updateBreadcrumb(breadcrumbData);
    };

    const handleAdd = () => navigate('/link/add');

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
            title: 'Độ ưu tiên',
            dataIndex: 'priority',
            key: 'priority',
        },
        {
            title: 'Trạng thái',
            key: 'is_active',
            dataIndex: 'is_active',
            render: (is_active) => (
                <Tag color={is_active ? 'green' : 'volcano'}>
                    {is_active ? 'HOẠT ĐỘNG' : 'KHÔNG HOẠT ĐỘNG'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tag
                        color="cyan"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            editStatus(`/apikeys/${record.key}`, {
                                is_active: !record.is_active,
                            })
                        }
                        title="Bật/Tắt API key"
                    >
                        <BulbOutlined />
                    </Tag>
                    <Tag color="purple" title="Sửa API key">
                        <Link to={`/link/edit/${record.key}`}>
                            <EditOutlined />
                        </Link>
                    </Tag>
                    <Popconfirm
                        title="Xóa API"
                        description="Bạn chắc chắn muốn xóa API này?"
                        onConfirm={() => deleteApi(`/apikeys/${record.key}`)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Tag color="red" title="Xóa API key">
                            <DeleteOutlined />
                        </Tag>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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
                        <Spin
                            spinning={loading}
                            tip="Đang lấy danh sách api key..."
                        >
                            <Table
                                columns={columns}
                                dataSource={data}
                                rowKey="key"
                            />
                        </Spin>
                    </BoxComponent>
                </>
            )}
        </>
    );
}

export default ApiLink;
