import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function ChangePassword() {
    const { updateBreadcrumb } = useOutletContext();

    useEffect(() => {
        updateBreadcrumb([
            {
                route: '/change-password',
                name: 'Đổi mật khẩu',
            },
        ]);
    }, [updateBreadcrumb]);

    return <div>short link</div>;
}

export default ChangePassword;
