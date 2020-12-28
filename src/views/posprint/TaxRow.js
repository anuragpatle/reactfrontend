import React from 'react'

const TaxRow = (props) => {

    const { gstTaxObj, gstKey } = props;

    return (
        <tr>
            <td className="text-left text-uppercase">{gstKey} (2.50 %)</td>
            <td colSpan="2"></td>
            <td> {gstTaxObj[gstKey]} </td>
        </tr>
    )
}

export default TaxRow
