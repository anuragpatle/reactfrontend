import React from 'react'
import moment from 'moment';

const ListTr = (props) => {

    const {
        invoice:{ invoice_no,invoice_date,sub_total,discount_amount,taxable_amount,amount_to_pay,gsttax:{tax_amount},table:{name} }, srNo,
        currentPage, perPage
    } = props || {};

    const newSr = ((currentPage - 1) * perPage) + srNo;

    const displyInvoiceDate = moment(new Date(invoice_date)).format("DD-MM-YYYY");

    return (
        <tr>
            <td>{newSr}</td>
            <td>{invoice_no}</td>
            <td>{name}</td>
            <td>{displyInvoiceDate}</td>
            <td>{sub_total}</td>
            <td>{discount_amount}</td>
            <td>{taxable_amount}</td>
            <td>{tax_amount}</td>
            <td>{amount_to_pay}</td>
        </tr>
    )
}

export default ListTr
