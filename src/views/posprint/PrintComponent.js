import React from 'react'
import { CCol, CRow } from '@coreui/react'
import moment from 'moment'

import { printHeading } from '../../utils/constant';

import ItemRow from './ItemRow'
import TaxRow from './TaxRow'

const PrintComponent = React.forwardRef((props, ref) => {

    const { invoiceData } = props || {};

    const {
        createdAt, invoice_no, table, sub_total, taxable_amount, amount_to_pay, invoiceitems, invoicetaxes
    } = invoiceData || {};

    const displayDateTime = moment(new Date(createdAt)).format("DD/MM/YYYY hh:mm A");

    let gstTax = {};

    invoicetaxes && invoicetaxes.forEach(tax => {
        gstTax = tax;
    });

    const gstTaxObj = (Object.keys(gstTax).length) ? JSON.parse(gstTax.tax_amt_obj) : {};

    const { head, sub_head, address, gstin } = printHeading || {};

    return (
        <div ref={ref}>
        <CRow className="justify-content-center">
            <CCol className="text-center" lg="4">
                <h2 className="mb-0">{head}</h2>
                <p className="mb-0">{sub_head}</p>
                <p className="mb-0">{address}</p>
                <p className="mb-1">GSTIN-{gstin}</p>
                <p className="h5">Invoice</p>
                <p className="mb-1">Date & Time {displayDateTime}</p>
                <p className="mb-1">Invoice No. {invoice_no}</p>
                <table className="table table-sm table-outline mb-3 d-sm-table">
                    <thead>
                        <tr className="text-center">
                            <th colSpan="4">{ table && table.name }</th>
                        </tr>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoiceitems && invoiceitems.map((lineitem, i) => (
                                <ItemRow
                                    key={i.toString()}
                                    lineitem={lineitem}
                                />
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-left">SubTotal</td>
                            <td colSpan="2"></td>
                            <td>{parseFloat(sub_total).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td className="text-left">Amount</td>
                            <td colSpan="2"></td>
                            <td>{parseFloat(taxable_amount).toFixed(2)}</td>
                        </tr>

                        { gstTaxObj && Object.keys(gstTaxObj).length > 0 &&
                            Object.keys(gstTaxObj).map((gstKey, i) => (
                                <TaxRow
                                    key={i}
                                    gstTaxObj={gstTaxObj}
                                    gstKey={gstKey}
                                />
                            ))
                        }

                        <tr>
                            <td className="text-left">
                                <strong>Total :</strong>
                                <br/>
                                <strong>E & O.E.</strong>
                            </td>
                            <td colSpan="2"></td>
                            <td>
                                <strong> {parseFloat(amount_to_pay).toFixed(2)} </strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <p>THANKS FOR YOUR VISIT. PLEASE VISIT AGAIN</p>
            </CCol>
        </CRow>
        </div>
    )
});

export default PrintComponent
