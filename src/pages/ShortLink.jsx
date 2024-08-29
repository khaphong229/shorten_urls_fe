import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function ShortLink() {
    const { updateBreadcrumb } = useOutletContext();

    useEffect(() => {
        updateBreadcrumb([
            {
                route: '/shortlink',
                name: 'Quản lý liên kết',
            },
        ]);
    }, [updateBreadcrumb]);

    return <div>short link</div>;
}

export default ShortLink;
