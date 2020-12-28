import React from 'react'
import LineTr from './LineTr'

const ListTr = (props) => {

    const {
        lineItemKey, lineItems, categories, allItems, removeLineItem, setEditFormData, currentEditLine
    } = props || {};

    let categoryObj = categories.find(category => category.id === parseInt(lineItemKey));

    const { name } = categoryObj || {};

    return (
        <>
            <tr>
                <td colSpan="6">
                    Category : { name }
                </td>
            </tr>

            { lineItems[lineItemKey] && lineItems[lineItemKey].length > 0 && lineItems[lineItemKey].map((lineItem, i) => (
                <LineTr
                    key={i.toString()+lineItemKey}
                    lineItem={lineItem}
                    allItems={allItems}
                    indx={i}
                    removeLineItem={removeLineItem}
                    setEditFormData={setEditFormData}
                    lineItemKey={lineItemKey}
                    currentEditLine={currentEditLine}
                />
            )) }
        </>
    )
}

export default ListTr
