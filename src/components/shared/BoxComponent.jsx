import { theme } from 'antd';
import React from 'react';

function BoxComponent({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG, colorBorderBg },
    } = theme.useToken();
    return (
        <>
            <div
                style={{
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                }}
                className="h-fit"
            >
                {children}
            </div>
        </>
    );
}

export default BoxComponent;
