import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

function ButtonComponent({ typeButton, content }) {
    return (
        <Button type={typeButton}>
            <Link to={content === 'Đăng nhập' ? '/login' : '/register'}>
                {content}
            </Link>
        </Button>
    );
}

export default ButtonComponent;
