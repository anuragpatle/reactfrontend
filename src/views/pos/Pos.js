import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react'
import moment from 'moment';

import { AuthApi } from '../../utils/api';
import { toast } from 'react-toastify';
import { calAmountFromPercent, checkDataIsValid } from '../../utils/secure'
import { discountAbleCategoryArr } from '../../utils/constant'

import useForm from '../../useForm';
import validate from '../../validate/validatePOS';

import POSForm from './Form'
import ListTr from './ListTr'
import InvFooter from './InvFooter'
import BlockBtn from './BlockBtn'

const Pos = (props) => {

    const { id } = useParams();

    const footerDataObj = {
        sub_total       : 0,
        discount_on_amt : 0,
        discount_percent: 0,
        discount_amount : 0,
        taxable_amount  : 0, // discount_on_amt - discount_amount
        tax_percent     : 5,
        tax_amount      : 0,
        tax_amt_obj     : {
            cgst: 0,
            sgst: 0
        },
        amount_to_pay   : 0
    };

    const [ categories, setCategories ] = useState([]);
    const [ allItems, setAllItems ]     = useState([]);
    // const [ allTables, setAllTables ]   = useState([]);
    const [ table, setTable ]           = useState({});
    const [ lineItems, setLineItems ]   = useState({});
    const [ currentEditLine, setCurrentEditLine ] = useState({});
    const [ usedItemIds, setUsedItemIds ]   = useState([]);
    const [ footerData, setFooterData ]     = useState(footerDataObj);

    const getDSData = async () => {
        try {
            const listResponse = await AuthApi.get(`/invoices-ds`);
            const { status, data } = listResponse;
            if( status === 200 ){
                const { items, categories, tables } = data || {};
                if(items !== undefined) setAllItems(items);
                if(categories !== undefined) setCategories(categories);
                // if(tables !== undefined) setAllTables(tables);

                // find current table
                let tableObj = tables.find(table => table.id === parseInt(id));
                setTable(tableObj);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const addLineItem = async () => {
        const { category_id } = values;
        const newValues = values;

        // in case of edit
        const { category_id:catIndx, line_index } = currentEditLine || {};

        if( checkDataIsValid(catIndx) && checkDataIsValid(line_index) ){
            lineItems[catIndx][line_index] = newValues;
            setLineItems({...lineItems});
            setCurrentEditLine({});

            // get all used item ids
            getAllUsedItems(lineItems);
        }

        // in case is add
        if( !checkDataIsValid(catIndx) && !checkDataIsValid(line_index) ){

            // if category_id is present in lineItem object
            if( checkDataIsValid(lineItems[category_id]) ){
                lineItems[category_id].push(newValues);
                // setLineItems(lineItems);
            }

            // if category_id is not present in lineItem object
            if( !checkDataIsValid(lineItems[category_id]) ){
                lineItems[category_id] = [ {...newValues} ];
            }
            setLineItems(lineItems);

            // get all used item ids
            getAllUsedItems(lineItems);
        }

        setValues({
            ...formInputObj,
            category_id
        });
    }

    const removeLineItem = (catId, indx) => {
        let newLineItems = lineItems[catId].filter((items, index) => index !== indx);
        lineItems[catId] = newLineItems;
        // if line items is zero for seleted category
        if(!newLineItems.length){
            delete lineItems[catId];
        }
        setLineItems({...lineItems});

        getAllUsedItems(lineItems);
    }

    const setEditFormData = (catId, indx, editObj) => {
        const currEditLineObj = {
            category_id : catId,
            line_index  : indx
        };

        setCurrentEditLine(currEditLineObj);

        for (let [key] of Object.entries(formInputObj)) {
            formInputObj[key] = editObj[key];
        }

        setValues({ ...formInputObj });
    }

    // to get all used item ids and total amount
    const getAllUsedItems = async (allLineItems) => {

        let usedItemIdsArr = [];

        if( checkDataIsValid(allLineItems) && Object.keys(allLineItems).length > 0 ){
            Object.keys(allLineItems).forEach((lineItemKey) => {
                allLineItems[lineItemKey].forEach((lineItem) => {
                    let { item_id } = lineItem;
                    usedItemIdsArr.push(parseInt(item_id));
                });
            });
        }

        setUsedItemIds(usedItemIdsArr);

        getFooterData(allLineItems);
    }

    const getFooterData = (lineItemsData, discountPercent = null) => {

        let {
            sub_total, discount_on_amt, discount_amount, taxable_amount, tax_percent, tax_amount, amount_to_pay
        } = footerDataObj;

        let discount_percent = ( discountPercent === null) ? footerData.discount_percent : discountPercent;

        if( checkDataIsValid(lineItemsData) && Object.keys(lineItemsData).length > 0 ){
            Object.keys(lineItemsData).forEach((lineItemKey) => {
                lineItemsData[lineItemKey].forEach((lineItem) => {
                    let { amount, category_id } = lineItem;
                    sub_total += parseFloat(amount);
                    if( discountAbleCategoryArr.includes(parseInt(category_id)) ){
                        discount_on_amt += parseFloat(amount);
                    }
                });
            });
        }

        discount_amount = calAmountFromPercent(discount_percent, discount_on_amt);

        taxable_amount = parseFloat(sub_total) - parseFloat(discount_amount);

        tax_amount = calAmountFromPercent(tax_percent, taxable_amount);

        const divide_gst = parseFloat(tax_amount / 2).toFixed(2);

        // amount_to_pay = Math.round(parseFloat(taxable_amount) + parseFloat(tax_amount));
        amount_to_pay = parseFloat(parseFloat(taxable_amount) + parseFloat(tax_amount)).toFixed(2);

        let newfooterDataObj = {
            sub_total,
            discount_on_amt,
            discount_percent,
            discount_amount,
            taxable_amount,
            tax_percent,
            tax_amount,
            tax_amt_obj : {
                cgst: divide_gst,
                sgst: divide_gst
            },
            amount_to_pay
        };

        setFooterData({ ...newfooterDataObj });
    }

    const footerInputChangeHandle = (event) => {
        const { name, value } = event.target;

        setFooterData({
            ...footerData,
            [name] : value
        });

        getFooterData(lineItems, value);
    }

    // To save Invoice
    const saveInvoice = async () => {
        const { sub_total, discount_on_amt, discount_percent, discount_amount, taxable_amount, tax_percent, tax_amount, tax_amt_obj, amount_to_pay } = footerData;

        let sendInvoiceItemArr = [];
        Object.keys(lineItems).forEach((lineItemKey) => {
            lineItems[lineItemKey].forEach((lineItem) => {
                sendInvoiceItemArr.push(lineItem);
            });
        });

        const invoice_date = moment(new Date()).format("YYYY-MM-DD");

        const save_tax_amt_obj = JSON.stringify(tax_amt_obj);

        const sendData = {
            table_id: parseInt(id),
            invoice_date,
            sub_total,
            discount_on_amt,
            discount_percent,
            discount_amount,
            taxable_amount,
            amount_to_pay,
            paid_amount : amount_to_pay,
            balance: 0,
            invoiceitems: sendInvoiceItemArr,
            invoicetaxes: [
                { category_id: 1, taxable_amount, tax_percent, tax_amount, tax_amt_obj: save_tax_amt_obj }
            ]
        };

        // console.log(sendData);

        try {
            const saveResponse = await AuthApi.post("/invoice-add", sendData);
            const { status, data } = saveResponse;
            if( status === 201 && data.invoice !== undefined ){
                const { id } = data.invoice;
                toast.success(`Invoice saved successfully`);
                props.history.push(`/pos-print/${id}`);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
            // const { response } = e;
            // if(response !== undefined && Object.keys(response.data).length && response.data.error !== undefined ){
            //     setErrors(response.data.error); // if error from server side
            // }
        }

        //props.history.push('/pos-print/1');
        // const win = window.open("#/pos-print/1", "_blank");
        // win.focus();
    }

    // To cancel Invoice
    const cancelInvoice = () => {
        // console.log('cancel invoice');
        toast.info(`Invoice successfully canceled`);
        props.history.push(`/pos-tables`);
    }

    const formInputObj = {
        category_id : "",
        item_id     : "",
        quantity    : 1,
        unit_price  : "",
        amount      : ""
    };

    const { handleChange, handleSubmit, values, errors, setErrors, setValues } = useForm(
        addLineItem,
        validate,
        formInputObj
    )

    useEffect(() => {
        getDSData()
    }, []);

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Create Invoice
                        <div className="card-header-actions">
                            <CButton
                                color="secondary"
                                className="float-right btn-square"
                                variant="outline"
                                size="sm"
                                to="/pos-tables"
                                >
                                Back
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs="12" sm="12" lg="12">
                                <table className="table table-hover table-outline mb-2 d-none d-sm-table">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th className="text-left">
                                            Billing Table :
                                            <span className="text-warning ml-1">
                                                {table.name} ( {table.capacity} Persons )
                                            </span>
                                        </th>
                                        <th className="text-right">
                                            Bill Date :
                                            <span className="text-warning ml-1">
                                                { moment(new Date()).format("DD-MM-YYYY") }
                                            </span>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                            </CCol>

                            <CCol xs="12" sm="12" lg="12">
                                <POSForm
                                    categories={categories}
                                    allItems={allItems}
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    setValues={setValues}
                                    setErrors={setErrors}
                                    values={values}
                                    errors={errors}
                                    currentEditLine={currentEditLine}
                                    usedItemIds={usedItemIds}
                                />
                            </CCol>

                            <CCol xs="12" sm="12" lg="12">

                                <table className="table table-sm table-hover table-striped table-outline mb-3 d-none d-sm-table">
                                    <thead>
                                        <tr className="thead-dark">
                                            <th>Sr No.</th>
                                            <th>Action</th>
                                            <th>Item</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        { lineItems && Object.keys(lineItems).length > 0 &&
                                            Object.keys(lineItems).map((lineItemKey, i) => (
                                                <ListTr
                                                    key={lineItemKey+i.toString()}
                                                    lineItemKey={lineItemKey}
                                                    lineItems={lineItems}
                                                    categories={categories}
                                                    allItems={allItems}
                                                    removeLineItem={removeLineItem}
                                                    setEditFormData={setEditFormData}
                                                    currentEditLine={currentEditLine}
                                                />
                                            ))
                                        }

                                        { lineItems && Object.keys(lineItems).length === 0 &&
                                            <tr className="text-center">
                                                <td colSpan="6">No items to display, Please add items.</td>
                                            </tr>
                                        }

                                    </tbody>

                                    {/* Invoice Footer Starts Here */}
                                    { lineItems && Object.keys(lineItems).length > 0 &&
                                        <InvFooter
                                            footerData={footerData}
                                            footerInputChangeHandle={footerInputChangeHandle}
                                        />
                                    }
                                </table>
                            </CCol>

                            { lineItems && Object.keys(lineItems).length > 0 &&
                            <>
                                <CCol xs="12" sm="12" lg="6">
                                    <BlockBtn
                                        clickAction={cancelInvoice}
                                        content="Click to Cancel Bill"
                                        color="danger"
                                        label="Cancel"
                                    />
                                </CCol>
                                <CCol xs="12" sm="12" lg="6">
                                    <BlockBtn
                                        clickAction={saveInvoice}
                                        content="Click to Pay Bill"
                                        color="success"
                                        label="Pay"
                                    />
                                </CCol>
                            </>
                            }
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Pos
