import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Quick() {
    const { updateBreadcrumb } = useOutletContext();

    useEffect(() => {
        updateBreadcrumb([
            {
                route: '/quick',
                name: 'Quick link',
            },
        ]);
    }, [updateBreadcrumb]);

    return <div>short link</div>;
}

export default Quick;
