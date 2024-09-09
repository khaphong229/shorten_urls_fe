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
    Form,
} from 'antd';
import { BulbOutlined, CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import BoxComponent from '../../components/shared/BoxComponent';
import {
    createLink,
    deleteShortLink,
    getAllShortLink,
    getShortLinkById,
    searchShortLink,
} from '../../services/shorten'
import { displayStatus } from '../../services/notification';
import ShortenLink from '../../components/modals/ShortenLink';
const { Search } = Input;

function ShortLink() {
    const [shortLinks, setShortLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { updateBreadcrumb } = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [shortenedLink, setShortenedLink] = useState(null);
    const [formValue, setFormValue] = useState({})
    const [mode, setMode]=useState(null)
    useEffect(() => {
        fetchApiKey();
        updateBreadcrumbBasedOnPath();
    }, [location]);

    const onCreate = async (values) => {
        const { original_link, alias } = values;
        const data = {
            original_url: original_link,
            alias: alias,
        };
        try {
            const res = await createLink(data);;
            if (res.data.success) {
                displayStatus('success', res.data.message);
                const url = `${window.location.origin}/${res.data.data.alias}`;
                setShortenedLink(url)
            } else {
                displayStatus('warning', res.data.message);
            }
        } catch (error) {
            displayStatus('error', 'Lỗi trong quá trình rút gọn');
        }
    };

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
            const res = await searchShortLink(value);
            if (res.data.success) {
                setTimeout(() => {
                    setShortLinks(res.data.data);
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

    const deleteShort = useCallback(async (id) => {
        try {
            const res = await deleteShortLink(id);
            console.log(res);
            
            if (res.data.success) {
                displayStatus('success', 'Xóa thành công');
                fetchApiKey();
            } else {
                displayStatus('warning',  res.data.message);
            }
        } catch (error) {
            displayStatus('error', 'Vui lòng thử lại');
        }
    }, []);

    const handleCopy = (alias) => {
        const url = `${window.location.origin}/${alias}`;
        navigator.clipboard.writeText(url).then(() => {
            displayStatus('success', 'Đã sao chép liên kết');
        }, () => {
            displayStatus('error', 'Không thể sao chép liên kết');
        });
    }

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

    const handleAdd = () => {
        form.resetFields(); 
        setFormValue({});
        setShortenedLink(null);
        setMode('add')
        setOpen(true);
    }
    

    const handleUpdate = useCallback(async (id) => {
        setMode('edit')
        try {
            const res = await getShortLinkById(id);
            if (res.data.success) {
                const linkData = res.data.data;
                const valueShort = {
                    original_link: linkData.original_url,
                    alias: linkData.alias,
                };
                form.setFieldsValue(valueShort); 
                setFormValue(valueShort);
            }
            setOpen(true); 
        } catch (error) {
            displayStatus('error', 'Đang lỗi vui lòng thử lại');
        }
    }, []);

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
                    <Tag color="purple"
                        title="Sửa liên kết"
                        style={{ cursor: 'pointer'}}
                        onClick={()=>{
                        setOpen(true)
                        handleUpdate(record.key)
                    }}>
                        <EditOutlined />
                    </Tag>
                    <Popconfirm
                        title="Xóa liên kết"
                        
                        description="Bạn chắc chắn muốn xóa liên kết này?"
                        onConfirm={() => deleteShort(record.key)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Tag color="red" title="Xóa liên kết" style={{ cursor: 'pointer'}}>
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
                        <div className='flex items-center gap-5'>
                            <p className="mb-5">Danh sách liên kết</p>
                            <Tag color='blue' className='mb-5'>Bạn đang dùng api link4m</Tag>
                        </div>
                            
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
                    {open && (
                        <ShortenLink isVisible={open} handleOk={()=>form.submit()} handleCancel={()=>setOpen(false)} form={form} onCreate={onCreate} shortenedLink={shortenedLink} valueShort={formValue} mode={mode}></ShortenLink>
                    )}
                </>
            )}
        </>
    );
}

export default ShortLink;