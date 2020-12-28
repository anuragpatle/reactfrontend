import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react'

import { AuthApi } from '../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../useForm';
import validate from '../../../validate/validateItem';
import FormDesign from './Form';

const Add = (props) => {

    const [ categories, setCategories ] = useState([]);

    const getRelatedDS = async () => {
        try {
            const listResponse = await AuthApi.get(`/categories-ds`);
            const { status, data } = listResponse;
            if( status === 200 && data.categories !== undefined ){
                setCategories(data.categories);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const saveResponse = await AuthApi.post("/item-add", values);
            const { status, data } = saveResponse;
            if( status === 201 && data.item !== undefined ){
                toast.success(`Item added successfully`);
                props.history.push('/items');
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
            const { response } = e;
            if(response !== undefined && Object.keys(response.data).length && response.data.error !== undefined ){
                setErrors(response.data.error); // if error from server side
            }
        }
    }

    const formInputObj = {
        category_id : "",
        name        : "",
        price       : ""
    };

    const { handleChange, handleSubmit, values, errors, setErrors, setValues } = useForm(
        submit,
        validate,
        formInputObj
    )

    useEffect(() => {
        getRelatedDS()
    }, [])

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Add Item
                        <div className="card-header-actions">
                            <CButton
                                color="secondary"
                                className="float-right btn-square"
                                variant="outline"
                                size="sm"
                                to="/items"
                                >
                                Back
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
                            categories={categories}
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            setValues={setValues}
                            values={values}
                            errors={errors}
                            edit={false}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Add
