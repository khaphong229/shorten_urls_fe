import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

function AddApiLink() {
    const { updateBreadcrumb } = useOutletContext();
    useEffect(() => {
        updateBreadcrumb([
            {
                route: '/add',
                name: 'Thêm',
            }
        ])
    }, [updateBreadcrumb])
  return (
    <div>
      hello
    </div>
  )
}

export default AddApiLink
