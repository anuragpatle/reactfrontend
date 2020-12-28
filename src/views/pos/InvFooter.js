import React from 'react'
import { CSelect } from '@coreui/react'

import { discountOptionArr, taxOptionArr } from '../../utils/constant';

const InvFooter = (props) => {

    const {
        footerData:{
            sub_total, discount_on_amt, taxable_amount, tax_percent, tax_amount, tax_amt_obj, amount_to_pay,
            discount_percent, discount_amount
        }, footerInputChangeHandle
    } = props || {};

    const { cgst, sgst } = tax_amt_obj || {};

    return (
        <tfoot>
            <tr className="bg-info">
                <td colSpan="4"></td>
                <td>
                    Sub Total
                </td>
                <td>
                    Rs. {sub_total}
                </td>
            </tr>
            <tr className="bg-info">
                <td colSpan="4"></td>
                <td>
                    Discount On
                </td>
                <td>
                    Rs. {discount_on_amt}
                </td>
            </tr>
            <tr className="bg-info">
                <td colSpan="3"></td>
                <td>
                    Discount
                </td>
                <td className="discount-td">
                    <CSelect
                        custom size="sm"
                        name="discount_percent"
                        value={discount_percent}
                        onChange={footerInputChangeHandle}
                    >
                        <option value="0">Please select</option>
                        { discountOptionArr && discountOptionArr.map((disOption, i) => (
                            <option key={i.toString()} value={disOption.value}>{disOption.label}</option>
                        )) }
                    </CSelect>
                </td>
                <td>
                    Rs. {discount_amount}
                </td>
            </tr>
            <tr className="bg-info">
                <td colSpan="4"></td>
                <td>
                    Taxable Amt
                </td>
                <td>
                    Rs. {taxable_amount}
                </td>
            </tr>
            <tr className="bg-info">
                <td colSpan="2"></td>
                <td>
                    CGST (2.5%) - Rs. {cgst} | SGST (2.5%) - Rs. {sgst}
                </td>
                <td>
                    GST
                </td>
                <td className="discount-td">
                    <CSelect
                        custom size="sm"
                        name="selectSm"
                        value={tax_percent}
                        readOnly
                    >
                        { taxOptionArr && taxOptionArr.map((taxOption, i) => (
                            <option key={i.toString()} value={taxOption.value}>{taxOption.label}</option>
                        )) }
                    </CSelect>
                </td>
                <td>
                    Rs. {tax_amount}
                </td>
            </tr>
            <tr className="bg-dark">
                <td colSpan="4"></td>
                <td>
                    Amount To Pay
                </td>
                <td>
                    Rs. {amount_to_pay}
                </td>
            </tr>
        </tfoot>
    )
}

export default InvFooter
