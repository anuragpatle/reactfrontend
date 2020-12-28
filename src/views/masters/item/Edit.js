import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
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

const Edit = (props) => {

    const { id } = useParams();

    const [ categories, setCategories ] = useState([]);

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/item-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.item !== undefined ){
                const { item } = data;
                for (let [key] of Object.entries(formInputObj)) {
                    formInputObj[key] = item[key];
                }
                setValues({ ...formInputObj });

                if(data.categories !== undefined) setCategories(data.categories);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const editResponse = await AuthApi.put(`/item-update/${id}`, values);
            const { status, data } = editResponse;
            if( status === 201 && data.item !== undefined ){
                toast.success(`Item updated successfully`);
                props.history.push("/items");
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
    );

    useEffect(() => {
        getEditData();
    }, []);

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Edit Item
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
                            edit={true}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Edit
