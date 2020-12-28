import React from 'react'
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

const Add = (props) => {

    const submit = async () => {
        try {
            const saveResponse = await AuthApi.post("/table-add", values);
            const { status, data } = saveResponse;
            if( status === 201 && data.table !== undefined ){
                toast.success(`Table added successfully`);
                props.history.push('/tables');
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

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Add Table
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
                            edit={false}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Add
