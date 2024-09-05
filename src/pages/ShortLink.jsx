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
import { BulbOutlined, CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import BoxComponent from '../components/BoxComponent';
import {
    deleteShortLink,
    getAllShortLink,
    searchShortLink,
} from '../services/shorten'

const { Search } = Input;

function ShortLink() {
    const [shortLinks, setShortLinks] = useState([]);
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
            const res = await getAllShortLink();
            
            if (res.data.success) {
                setTimeout(() => {
                    setShortLinks(res.data.data);
                    setLoading(false);
                }, 500);
            } else {
                showNotification('warning', 'Thất bại', res.data.message);
                setLoading(false);
            }
        } catch (error) {
            showNotification('error', 'Lỗi', 'Vui lòng thử lại bạn nhé');
            setLoading(false);
        }
    };

    const onSearch = async (value) => {
        setLoading(true);
        try {
            const res = await searchShortLink(value);
            if (res.data.success) {
                setTimeout(() => {
                    setShortLinks(res.data.data);
                    setLoading(false);
                }, 500);
            } else {
                showNotification('warning', 'Thất bại', 'Tìm kiếm thất bại');
                setLoading(false);
            }
        } catch (error) {
            showNotification('error', 'Lỗi', 'Lỗi trong quá trình tìm kiếm');
            setLoading(false);
        }
    };

    const deleteShort = useCallback(async (id) => {
        try {
            const res = await deleteShortLink(id);
            console.log(res);
            
            if (res.data.success) {
                showNotification('success', 'Thành công', 'Xóa thành công');
                fetchApiKey();
            } else {
                showNotification('warning', 'Thất bại', res.data.message);
            }
        } catch (error) {
            showNotification('error', 'Lỗi', 'Vui lòng thử lại');
        }
    }, []);

    const handleCopy = (alias) => {
        const url = `${window.location.origin}/${alias}`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('success', 'Thành công', 'Đã sao chép liên kết');
        }, () => {
            showNotification('error', 'Lỗi', 'Không thể sao chép liên kết');
        });
    }

    const showNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
            duration: 2,
            placement: 'top',
        });
    };

    const updateBreadcrumbBasedOnPath = () => {
        const path = location.pathname;
        const breadcrumbData = [
            {
                route: '/shortlink',
                name: 'Danh sách liên kết',
            },
        ];

        if (path.includes('/shortlink/add')) {
            breadcrumbData.push({
                route: '/shortlink/add',
                name: 'Thêm liên kết',
            });
        } else if (path.includes('/shortlink/edit')) {
            breadcrumbData.push({
                route: '/shortlink/edit',
                name: 'Cập nhật liên kết',
            });
        }

        updateBreadcrumb(breadcrumbData);
    };

    const handleAdd = () => navigate('/shortlink/add');

    const columns = [
        {
            title: 'STT',
            dataIndex: 'ordered',
            key: 'ordered',
        },
        {
            title: 'Alias',
            dataIndex: 'alias',
            key: 'alias',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Link gốc',
            dataIndex: 'original_url',
            key: 'original_url',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_date',
            key: 'created_date',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tag
                        color="cyan"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleCopy(record.alias)}
                        title="Copy liên kết"
                    >
                        <CopyOutlined />
                    </Tag>
                    <Tag color="purple" title="Sửa liên kết">
                        <Link to={`/shortlink/edit/${record.key}`}>
                            <EditOutlined />
                        </Link>
                    </Tag>
                    <Popconfirm
                        title="Xóa liên kết"
                        description="Bạn chắc chắn muốn xóa liên kết này?"
                        onConfirm={() => deleteShort(record.key)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Tag color="red" title="Xóa liên kết">
                            <DeleteOutlined />
                        </Tag>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data = shortLinks
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((item, index) => ({
            key: item.id,
            ordered: index + 1,
            alias: item.alias,
            original_url: item.original_url,
            created_date: new Date(item.created_at).toISOString().split('T')[0],
            is_active: item.is_active,
        }));
    
    return (
        <>
            <Outlet context={{ updateBreadcrumb }} />
            {location.pathname === '/shortlink' && (
                <>
                    <BoxComponent>
                        <p className="mb-5">Danh sách liên kết</p>
                        <div className="flex justify-between">
                            <Search
                                placeholder="Nhập alias liên kết bạn muốn tìm"
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
                            tip="Đang lấy danh sách liên kết..."
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

export default ShortLink;