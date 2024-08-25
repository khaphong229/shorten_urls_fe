import React from 'react';
import { Button } from 'antd';

function ButtonComponent(props) {
    return <Button type={props.typeButton}>{props.content}</Button>;
}

export default ButtonComponent;
