import React, { useEffect } from 'react'
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
import validate from '../../../validate/validateTable';
import FormDesign from './Form';

const Edit = (props) => {

    const { id } = useParams();

    const getEditData = async () => {
        try {
            const getResponse = await AuthApi.get(`/table-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.table !== undefined ){
                const { table } = data;
                for (let [key] of Object.entries(formInputObj)) {
                    formInputObj[key] = table[key];
                }
                setValues({ ...formInputObj });
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const submit = async () => {
        try {
            const editResponse = await AuthApi.put(`/table-update/${id}`, values);
            const { status, data } = editResponse;
            if( status === 201 && data.table !== undefined ){
                toast.success(`Table updated successfully`);
                props.history.push("/tables");
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
        name     : "",
        capacity : ""
    };

    const { handleChange, handleSubmit, values, errors, setErrors, setValues } = useForm(
        submit,
        validate,
        formInputObj
    )

    useEffect(() => {
        getEditData();
    }, []);

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Edit Table
                        <div className="card-header-actions">
                            <CButton
                                color="secondary"
                                className="float-right btn-square"
                                variant="outline"
                                size="sm"
                                to="/tables"
                                >
                                Back
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <FormDesign
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
