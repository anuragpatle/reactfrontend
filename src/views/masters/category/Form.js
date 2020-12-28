import React from 'react'
import {
    CButton,
    CCol,
    CRow,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CInvalidFeedback
  } from '@coreui/react'

const Form = (props) => {

    const { handleSubmit, handleChange, values, errors, edit } = props;

    const btnText = (edit !== undefined && edit === true) ? 'Update' : 'Save';

    return (
        <CForm onSubmit={handleSubmit} noValidate>
            <CRow>
                <CCol xs="12" md="6">
                    <CFormGroup>
                        <CLabel htmlFor="name">Category Name</CLabel>
                        <CInput
                            id="name"
                            placeholder="Enter category name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            invalid={errors.name !== undefined}
                            required
                            />
                        <CInvalidFeedback>Category name is required</CInvalidFeedback>
                    </CFormGroup>
                </CCol>
            </CRow>
            <CRow className="text-right">
                <CCol xs="12" md="6">
                    <CButton
                        color="success"
                        className="btn-square"
                        variant="outline"
                        // size="sm"
                        type="submit"
                        >
                        { btnText }
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Form
