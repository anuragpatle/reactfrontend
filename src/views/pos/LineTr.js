import React, { useState, useEffect } from 'react'
import { CTooltip } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { checkDataIsValid } from '../../utils/secure'

const LineTr = (props) => {

    const [ showDelete, setShowDelete ] = useState(true);

    const { lineItem, allItems, indx, removeLineItem, lineItemKey, setEditFormData, currentEditLine } = props;

    const srNo = indx + 1;

    const { item_id, unit_price, quantity, amount } = lineItem || {};

    let itemObj = allItems.find(item => item.id === parseInt(item_id));

    const { name } = itemObj || {};

    const editLineItem = () => {
        setEditFormData(lineItemKey, indx, lineItem);
    }

    const deleteLineItem = () => {
        removeLineItem(lineItemKey, indx);
    }

    useEffect(() => {
        const { category_id, line_index } = currentEditLine || {};
        setShowDelete(true);
        if( checkDataIsValid(category_id) && checkDataIsValid(line_index) ){
            if(category_id == lineItemKey && line_index == indx){
                setShowDelete(false);
            }
        }
    }, [currentEditLine])

    return (
            <tr className={!showDelete ? 'bg-secondary' : ''}>
                <td>{srNo}</td>
                <td className="tb-action">
                    <CTooltip content="Edit" placement="left">
                        <CIcon
                            className="text-warning"
                            content={freeSet.cilPencil}
                            onClick={editLineItem}
                        />
                    </CTooltip>
                    { showDelete &&
                        <CTooltip content="Delete" placement="right">
                            <CIcon
                                className="text-danger ml-2"
                                content={freeSet.cilTrash}
                                onClick={deleteLineItem}
                            />
                        </CTooltip>
                    }
                </td>
                <td>{name}</td>
                <td>Rs. {unit_price}</td>
                <td>{quantity}</td>
                <td>Rs. {amount}</td>
            </tr>
    )
}

export default LineTr
