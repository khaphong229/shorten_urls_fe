import React from 'react';
import { Modal, Form, Input, Tag, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { displayStatus } from '../../services/notification'

const ShortenLink = ({ isVisible, handleOk, handleCancel, form, onCreate, shortenedLink, valueShort, mode }) => { 
    function onCopy(url) {
        navigator.clipboard.writeText(url).then(()=> {
            displayStatus('success', 'Sao chép liên kết thành công!')
        }, ()=> {
            displayStatus('error', 'Sao chép liên kết thất bại!')
        })
    }
    return (
        <Modal
            open={isVisible}
            title="Tạo liên kết nhanh"
            okText={mode === 'edit' ? 'Cập nhật' : 'Tạo'}
            cancelText="Hủy"
            onCancel={handleCancel}
            onOk={() => form.submit()}
            destroyOnClose
        >
            <Form
                layout="vertical"
                form={form}
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
                onFinish={onCreate}
            >
                <Form.Item
                    name="alias"
                    label="Alias (Tùy chọn)"
                    rules={[
                        {
                            required: false,
                            pattern: /^[a-zA-Z0-9_-]{5,10}$/,
                            message: 'Alias phải từ 5-10 ký tự, không chứa ký tự đặc biệt',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="original_link"
                    label="Liên kết gốc"
                    // hidden={valueShort ? true : false}
                    rules={[
                        {
                            required: true,
                            type: 'url',
                            message: 'Vui lòng nhập URL hợp lệ',
                        },
                    ]}
                >
                    <Input
                        disabled={mode==='edit'}
                    />
                </Form.Item>
                {shortenedLink && (
                    <Form.Item label="Liên kết rút gọn">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input value={shortenedLink} readOnly style={{ marginRight: '8px' }} />
                            <Tag
                                color='blue'
                                style={{ cursor: 'pointer' }}
                                onClick={() => onCopy(shortenedLink)}
                                title='Copy liên kết'
                            >
                                <CopyOutlined style={{fontSize: '15px', margin: '6px 0px'}}/>
                            </Tag>
                        </div>
                    </Form.Item>
                )}
            </Form>
        </Modal>

    );
};

export default ShortenLink;
