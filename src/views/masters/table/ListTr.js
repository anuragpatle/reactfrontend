import React from 'react'
import { CButton } from '@coreui/react'

import useConfirm from '../../../utils/useConfirm';

const ListTr = (props) => {

    const { srNo, table:{ id, name, capacity }, deleteRow } = props;

    const editLink = `/table-edit/${id}`;

    const deleteSubmit = (closeDialog) => {
        deleteRow(id)
        closeDialog();
    }

    const { showDialog } = useConfirm(deleteSubmit, 'Table');

    return (
        <tr>
            <td>{srNo}</td>
            <td>{name}</td>
            <td>{capacity} Persons</td>
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
