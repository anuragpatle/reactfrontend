import React from 'react'
import { CButton } from '@coreui/react'

// import useConfirm from '../../../utils/useConfirm';

const ListTr = (props) => {

    const { srNo, category:{ id, name }, currentPage, perPage } = props; // deleteRow,

    const editLink = `/category-edit/${id}`;

    const newSr = ((currentPage - 1) * perPage) + srNo;

    // const deleteSubmit = (closeDialog) => {
    //     deleteRow(id)
    //     closeDialog();
    // }

    // const { showDialog } = useConfirm(deleteSubmit, 'Category');

    return (
        <tr>
            <td>{newSr}</td>
            <td>{ name }</td>
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
                {/* <CButton
                    color="danger"
                    className="btn-square ml-2"
                    variant="outline"
                    size="sm"
                    onClick={showDialog}
                    >
                        Delete
                </CButton> */}
            </td>
        </tr>
    )
}

export default ListTr
