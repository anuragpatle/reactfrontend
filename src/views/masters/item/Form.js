import React from 'react'
import {
    CButton,
    CCol,
    CRow,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CSelect,
    CInvalidFeedback
} from '@coreui/react'

const Form = (props) => {

    const { handleSubmit, handleChange, values, errors, categories, edit } = props;

    const btnText = (edit !== undefined && edit === true) ? 'Update' : 'Save';

    return (
        <CForm onSubmit={handleSubmit} noValidate>
            <CRow>
                <CCol xs="12" md="4">
                    <CFormGroup>
                        <CLabel htmlFor="category_id">Category</CLabel>
                        <CSelect
                            custom
                            name="category_id"
                            id="category_id"
                            value={values.category_id}
                            onChange={handleChange}
                            invalid={errors.category_id !== undefined}
                        >
                            <option value="">Please Select</option>
                            { categories && categories.map((category,i) => (
                                <option key={i.toString()} value={category.id}>{category.name}</option>
                            )) }
                        </CSelect>
                        <CInvalidFeedback>Category is required</CInvalidFeedback>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                    <CFormGroup>
                        <CLabel htmlFor="name">Item Name</CLabel>
                        <CInput
                            id="name"
                            placeholder="Enter item name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            invalid={errors.name !== undefined}
                            required
                        />
                        <CInvalidFeedback>Item name is required</CInvalidFeedback>
                    </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                    <CFormGroup>
                        <CLabel htmlFor="name">Item Price</CLabel>
                        <CInput
                            id="price"
                            placeholder="Enter item price"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                            invalid={errors.price !== undefined}
                            required
                        />
                        <CInvalidFeedback>Item price is required</CInvalidFeedback>
                    </CFormGroup>
                </CCol>
            </CRow>
            <CRow className="text-right">
                <CCol xs="12" md="12">
                    <CButton
                        color="success"
                        className="btn-square"
                        variant="outline"
                        size="sm"
                        type="submit"
                        >
                        {btnText}
                    </CButton>
                </CCol>
            </CRow>
        </CForm>
    )
}

export default Form
