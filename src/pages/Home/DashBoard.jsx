import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import BoxComponent from '../../components/shared/BoxComponent';

function DashBoard() {
    const { updateBreadcrumb } = useOutletContext();

    useEffect(() => {
        updateBreadcrumb([]);
    }, [updateBreadcrumb]);

    return (
        <>
            <BoxComponent>
                <h1>Dashboard</h1>
            </BoxComponent>
        </>
    );
}

export default DashBoard;
