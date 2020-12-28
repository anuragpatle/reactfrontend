import React, { useState, useEffect } from 'react'
import {
    CCol,
    CRow,
    CButton,
    CFormGroup,
    CLabel,
    CInput,
    CInvalidFeedback,
    CSelect,
    CForm
} from '@coreui/react'

import Select from 'react-select';
import { checkDataIsValid } from '../../utils/secure'

const Form = (props) => {

    const {
        categories, allItems, handleSubmit, handleChange, values, errors, setValues, currentEditLine, usedItemIds
    } = props;

    const [ items, setItems ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState(null);

    const itemHandleChange = (selectedOptn) => {
        setSelectedItem(selectedOptn);

        if( checkDataIsValid(selectedOptn) ){
            const { value } = selectedOptn;
            setValuesAsPerItem(value);
        }

        if(selectedOptn === null){
            clearItemValue();
        }
    }

    const setValuesAsPerItem = (itemId) => {
        let curentItemObj = allItems.find(item => item.id === parseInt(itemId));
        const { price } = curentItemObj;
        const { quantity } = values;
        const calAmt = parseFloat(price) * parseInt(quantity);
        setValues({
            ...values,
            item_id: itemId,
            unit_price: price,
            amount: calAmt
        });
    }

    const clearItemValue = () => {
        setSelectedItem(null);

        setValues({
            ...values,
            item_id: "",
            unit_price: "",
            quantity: 1,
            amount: ""
        });
    }

    const resetItemOptions = (categoryId, itemId) => {
        let newItemOptions = [];
        setItems(newItemOptions);
        if( checkDataIsValid(categoryId) ){
            allItems.forEach(item => {
                if( item.category_id === parseInt(categoryId) ){
                    if( !usedItemIds.includes(parseInt(item.id)) ){
                        let optObj = {
                            value: item.id,
                            label: item.name
                        };
                        newItemOptions.push(optObj);
                    }

                    if( checkDataIsValid(itemId) && parseInt(itemId) === item.id){
                        const { category_id } = currentEditLine || {};
                        if( checkDataIsValid(category_id) ){
                            let optObj = {
                                value: item.id,
                                label: item.name
                            };
                            newItemOptions.push(optObj);
                        }
                    }
                }
            });
            setItems(newItemOptions);
        }
    }

    useEffect(() => {
        const { category_id, item_id } = values;

        clearItemValue();

        resetItemOptions(category_id, item_id);

    }, [values.category_id]);

    useEffect(() => {
        const { category_id, item_id } = values;

        resetItemOptions(category_id, item_id);

        if( checkDataIsValid(category_id) && !checkDataIsValid(item_id) ){
            clearItemValue();
        }
    }, [values.item_id]);

    useEffect(() => {

        const { quantity, unit_price } = values;

        if( checkDataIsValid(quantity) && checkDataIsValid(unit_price) ){
            const calAmt = parseFloat(unit_price) * parseInt(quantity);
            setValues({
                ...values,
                amount: calAmt
            });
        }

        if( !checkDataIsValid(quantity) ){
            setValues({
                ...values,
                amount: ""
            });
        }

    }, [values.quantity])

    useEffect(() => {
        const setDataInCaseOfEdit = async () => {
            const { category_id, line_index } = currentEditLine || {};
            if( checkDataIsValid(category_id) && checkDataIsValid(line_index) ){
                const { item_id } = values;
                let curentItemObj = await allItems.find(item => item.id === parseInt(item_id));
                let optObj = {
                    value: curentItemObj.id,
                    label: curentItemObj.name
                };
                setSelectedItem(optObj);
                setValuesAsPerItem(item_id);
            }
        }
        setDataInCaseOfEdit();
    }, [currentEditLine])

    return (
        <CForm onSubmit={handleSubmit} noValidate>
            <CRow>
                <CCol xs="12" sm="12" lg="2">
                    <CFormGroup>
                        <CLabel htmlFor="category_id">Category</CLabel>
                        <CSelect
                            custom
                            id="category_id"
                            name="category_id"
                            value={values.category_id}
                            onChange={handleChange}
                            invalid={errors.category_id !== undefined}
                            disabled={currentEditLine && currentEditLine.category_id}
                        >
                            <option value="">Please Select</option>
                            { categories && categories.map((category, i) => (
                                <option key={i.toString()} value={category.id}>{category.name}</option>
                            )) }
                        </CSelect>
                        <CInvalidFeedback>Category is required</CInvalidFeedback>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" sm="12" lg="3">
                    <CFormGroup>
                        <CLabel htmlFor="item">Item</CLabel>
                        {/* <CSelect
                            custom
                            name="item"
                            id="item"
                            invalid={false}
                        >
                            <option value="">Please Select</option>
                            { items && items}
                            <option value="">Please Select</option>
                        </CSelect> */}

                        <Select
                            value={selectedItem}
                            onChange={itemHandleChange}
                            options={items}
                            isClearable={true}
                            className={errors.item_id !== undefined && 'is-invalid'}
                        />
                        <CInvalidFeedback>Item is required</CInvalidFeedback>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" sm="12" lg="2">
                    <CFormGroup>
                        <CLabel htmlFor="unit_price">Item Price</CLabel>
                        <CInput
                            id="unit_price"
                            name="unit_price"
                            value={values.unit_price}
                            onChange={handleChange}
                            invalid={errors.unit_price !== undefined}
                            required
                            disabled
                            />
                        <CInvalidFeedback>Price is required</CInvalidFeedback>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" sm="12" lg="2">
                    <CFormGroup>
                        <CLabel htmlFor="quantity">Quantity</CLabel>
                        <CInput
                            id="quantity"
                            placeholder="Enter quantity"
                            name="quantity"
                            value={values.quantity}
                            onChange={handleChange}
                            invalid={errors.quantity !== undefined}
                            min={1}
                            required
                            type="number"
                            />
                        <CInvalidFeedback>Quantity is required</CInvalidFeedback>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" sm="12" lg="2">
                    <CFormGroup>
                        <CLabel htmlFor="amount">Total</CLabel>
                        <CInput
                            id="amount"
                            name="amount"
                            value={values.amount}
                            onChange={handleChange}
                            invalid={errors.amount !== undefined}
                            required
                            disabled
                            />
                        <CInvalidFeedback>Total is required</CInvalidFeedback>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" sm="12" lg="1">
                    <CFormGroup>
                        <CLabel>&nbsp;</CLabel>
                        <CButton
                            color="success"
                            className="btn-square btn-block"
                            variant="outline"
                            // size="sm"
                            type="submit"
                        >
                            Add
                        </CButton>
                    </CFormGroup>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Form
