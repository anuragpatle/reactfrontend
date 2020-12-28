import React from 'react'

const ItemRow = (props) => {

    const { lineitem:{item, quantity, unit_price, amount} } = props || {};

    const { name } = item || {};

    return (
        <tr>
            <td className="text-left">{name}</td>
            <td>{quantity}</td>
            <td>{unit_price}</td>
            <td>{parseFloat(amount).toFixed(2)}</td>
        </tr>
    )
}

export default ItemRow
