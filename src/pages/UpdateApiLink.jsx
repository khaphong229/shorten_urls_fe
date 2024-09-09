import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import BoxComponent from '../components/BoxComponent';
import { Form, Input, Button, Select, notification, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getApiKeyById, updateApiKey } from '../services/apiKey';
import { LoadingOutlined } from '@ant-design/icons';
import { displayStatus } from '../services/notification';

function UpdateApiLink() {
    const { updateBreadcrumb } = useOutletContext();
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        updateBreadcrumb([
            {
                route: '/link',
                name: 'Danh sách web quản lý api link',
            },
            {
                route: `/link/edit/${id}`,
                name: 'Cập nhật API Link',
            },
        ]);
    }, [updateBreadcrumb, id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getApiKeyById(id);
                if (res.data && res.data.success) {
                    const apiData = res.data.data;
                    form.setFieldsValue({
                        url: apiData.api_key,
                        maxViews: apiData.maximum_view,
                        priority: apiData.priority,
                        description: apiData.description,
                        status: apiData.is_active.toString(),
                    });

                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                } else {
                    displayStatus('warning', 'Không thể lấy dữ liệu API. Vui lòng thử lại.')
                    setLoading(false);
                }
            } catch (error) {
                displayStatus('error', 'Đã xảy ra lỗi khi lấy dữ liệu. Vui lòng thử lại.')
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, form]);

    const onFinish = async (values) => {
        const { url, maxViews, priority, description, status } = values;
        const data = {
            api_key: url,
            priority: priority,
            maximum_view: maxViews,
            description: description,
            is_active: status === 'true',
        };
        try {
            setLoading(true);
            const res = await updateApiKey(id, data);
            if (res.data && res.data.success) {
                displayStatus('success', 'Cập nhật API thành công')
                navigate('/link');
            } else {
                displayStatus('warning', res.data.message || 'Cập nhật API thất bại' )
            }
        } catch (error) {
            displayStatus('error', 'Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại.')
        } finally {
            setLoading(false);
        }
    };

    return (
        <BoxComponent>
            <Spin spinning={loading} tip="Đang xử lý...">
                <h2 className="mb-5">Cập nhật API Link</h2>
                <Form
                    form={form}
                    name="update_api_link"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="url"
                        label="Link API"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Link API!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="maxViews"
                        label="Lượt xem tối đa"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lượt xem tối đa!',
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        name="priority"
                        label="Độ ưu tiên"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập độ ưu tiên!',
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item name="description" label="Mô tả">
                        <TextArea placeholder="Mô tả cho API link" allowClear />
                    </Form.Item>

                    <Form.Item name="status" label="Trạng thái">
                        <Select
                            style={{ width: 170 }}
                            options={[
                                { value: 'true', label: 'Hoạt động' },
                                { value: 'false', label: 'Không hoạt động' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            Cập nhật API Link
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </BoxComponent>
    );
}

export default UpdateApiLink;
