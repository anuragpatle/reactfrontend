import React from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    // CCard,
    // CCardBody,
    // CCardGroup,
    CCol,
    CContainer,
    // CForm,
    // CInput,
    // CInputGroup,
    // CInputGroupPrepend,
    // CInputGroupText,
    CRow
  } from '@coreui/react'

const Website = () => {
    return (
        <div className="c-app c-default-layout flex-row text-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="12">
                        <h1>Website </h1>
                        <p className="text-muted">content here</p>
                        <Link to="/login">
                            <CButton color="primary" className="mt-3" active tabIndex={-1}>Login</CButton>
                        </Link>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Website
