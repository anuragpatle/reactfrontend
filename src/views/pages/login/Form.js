import React from 'react'
import {
	CButton,
	CCol,
	CForm,
	CInput,
	CInputGroup,
	CInputGroupPrepend,
	CInputGroupText,
	CRow,
	CInvalidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { GuestApi } from '../../../utils/api';
import { toast } from 'react-toastify';

import useForm from '../../../useForm';
import validate from '../../../validate/validateLogin';

function Form() {

    const submit = async () => {
        try {
            const response = await GuestApi.post(`/login`, values);
            const { status, data } = response;
            if( status === 200 && data.token !== undefined && Object.keys(data.token).length ){
                localStorage.setItem('logged_user', `${JSON.stringify(data)}`);
                window.location.reload();
            }
        } catch (e) {
            const { response } = e;
            if( response !== undefined && Object.keys(response.data).length && response.data.error !== undefined ){
                setErrors(response.data.error); // if error from server side
            }else{
                toast.error(`😱 Axios request failed: ${e}`);
            }
        }
    }

    const formObj = { email_id: "", password: "" };
    const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
        submit,
        validate,
        formObj
    );

    return (
        <CForm onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p className="text-muted">Sign In to your account</p>
            <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                    <CInputGroupText>
                        <CIcon name="cil-user" />
                    </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    name="email_id"
                    value={values.email_id}
                    onChange={handleChange}
                    invalid={errors.email_id !== undefined}
                    valid={errors.email_id === undefined && Object.keys(errors).length > 0}
                />
                <CInvalidFeedback>{errors.email_id && errors.email_id}</CInvalidFeedback>
            </CInputGroup>
            <CInputGroup className="mb-4">
                <CInputGroupPrepend>
                    <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    invalid={errors.password !== undefined}
                    // valid={errors.password === undefined && Object.keys(errors).length > 0}
                />
                <CInvalidFeedback>{errors.password && errors.password}</CInvalidFeedback>
            </CInputGroup>
            <CRow>
            <CCol xs="6">
                <CButton type="submit" color="primary" className="px-4">Login</CButton>
            </CCol>
            {/* <CCol xs="6" className="text-right">
                <CButton color="link" className="px-0">Forgot password?</CButton>
            </CCol> */}
            </CRow>
        </CForm>
    )
}

export default Form
