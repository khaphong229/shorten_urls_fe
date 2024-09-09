import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Profile() {
    const { updateBreadcrumb } = useOutletContext();

    useEffect(() => {
        updateBreadcrumb([
            {
                route: '/profile',
                name: 'Thông tin tài khoản',
            },
        ]);
    }, [updateBreadcrumb]);

    return <div>short link</div>;
}

export default Profile;
