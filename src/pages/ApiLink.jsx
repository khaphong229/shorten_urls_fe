import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function ApiLink() {
    const { updateBreadcrumb } = useOutletContext();

    useEffect(() => {
        updateBreadcrumb([
            {
                route: '/link',
                name: 'Danh sách web quản lý api link',
            },
        ]);
    }, [updateBreadcrumb]);

    return <div>short link</div>;
}

export default ApiLink;
