import React from 'react'
import { CButton } from '@coreui/react'

import useConfirm from '../../../utils/useConfirm';

const ListTr = (props) => {

    const { srNo, item:{ id, name, price, category }, deleteRow, currentPage, perPage } = props;

    const editLink = `/item-edit/${id}`;

    const newSr = ((currentPage - 1) * perPage) + srNo;

    const deleteSubmit = (closeDialog) => {
        deleteRow(id)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'Item');

    return (
        <tr>
            <td>{newSr}</td>
            <td>{category.name}</td>
            <td>{name}</td>
            <td>Rs. {price}</td>
            <td className="text-center">
                <CButton
                    color="warning"
                    className="btn-square"
                    variant="outline"
                    size="sm"
                    to={editLink}
                >
                    Edit
                </CButton>
                <CButton
                    color="danger"
                    className="btn-square ml-2"
                    variant="outline"
                    size="sm"
                    onClick={showDialog}
                >
                    Delete
                </CButton>
            </td>
        </tr>
    )
}

export default ListTr
