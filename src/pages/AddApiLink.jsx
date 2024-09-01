import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import BoxComponent from '../components/BoxComponent';
import { Form, Input, Button, Select, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { createApiKey } from '../services/apiKey';

function AddApiLink() {
    const { updateBreadcrumb } = useOutletContext();
    const [form] = Form.useForm();

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
        const { name, maxViews, priority, description, status } = values;
        const data = {
            api_key: name,
            priority: priority,
            maximum_view: maxViews,
            description: description,
            is_active: status,
        };
        try {
            const res = await createApiKey(data);
            console.log(res);

            if (res.status < 400) {
                notification.success({
                    message: 'Thêm API link thành công',
                    description: res.data.message,
                });
            } else {
                notification.warning({
                    message: 'Thêm API link không thành công',
                    description: res.response.data.message,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Thêm API link lỗi',
                description: 'Vui lòng thử lại nhé',
            });
        }
    };

    return (
        <BoxComponent>
            <h2 className="mb-5">Thêm API Link</h2>
            <Form
                form={form}
                name="add_api_link"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ status: 'true' }}
            >
                <Form.Item
                    name="name"
                    label="Link API"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên API!' },
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
                        Thêm API Link
                    </Button>
                </Form.Item>
            </Form>
        </BoxComponent>
    );
}

export default AddApiLink;
