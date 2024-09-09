import React, { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import BoxComponent from '../../components/shared/BoxComponent';
import { Form, Input, Button, Select, notification, Spin } from 'antd';
import { createApiKey } from '../../services/apiKey';
import RichEditor from '../../components/other/RichEditor';
import TextArea from 'antd/es/input/TextArea';
import { displayStatus } from '../../services/notification'

function AddApiLink() {
    const { updateBreadcrumb } = useOutletContext();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [editorContent, setEditorContent] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
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
    }, [updateBreadcrumb]);

    const onFinish = async (values) => {
        const { url, maxViews, priority, status } = values;
        const data = {
            api_key: url,
            priority: priority,
            maximum_view: maxViews,
            description: editorContent,
            is_active: status === 'true',
        };
        console.log(data);
        setLoading(true);
        try {
            const res = await createApiKey(data);
            if (res.status < 400) {
                displayStatus('success', res.data.message)
                navigate('/link');
            } else {
                displayStatus('warning', res.response.data.message)
            }
        } catch (error) {
            displayStatus('error', 'Vui lòng thử lại nhé')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    return (
        <BoxComponent>
            <Spin spinning={loading} tip="Đang xử lý...">
                <h2 className="mb-5">Thêm API Link</h2>
                <Form
                    form={form}
                    name="add_api_link"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ status: 'true' }}
                >
                    <Form.Item
                        name="url"
                        label="Link API"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên API!',
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
                        {/* <RichEditor/> */}
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
                            Thêm API Link
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </BoxComponent>
    );
}

export default AddApiLink;
