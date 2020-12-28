import React, { useRef, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useReactToPrint } from 'react-to-print';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react'

import { AuthApi } from '../../utils/api';

import PrintComponent from './PrintComponent'

const PosPrint = () => {

    const { id } = useParams();

    const componentRef = useRef();

    const [invoiceData, setInvoiceData] = useState({})

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const getPrintData = async () => {
        try {
            const getResponse = await AuthApi.get(`/invoice-get/${id}`);
            const { status, data } = getResponse;
            if( status === 200 && data.invoice !== undefined ){
                const { invoice } = data;
                setInvoiceData(invoice);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    useEffect(() => {
        getPrintData();
    }, []);

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Invoice Print
                        <div className="card-header-actions">
                            <CButton
                                color="secondary"
                                className="float-right btn-square"
                                variant="outline"
                                size="sm"
                                to="/invoices"
                                >
                                Back
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className="justify-content-center">
                            <CCol xs="12" sm="12" lg="4">
                                <CButton
                                    color="primary"
                                    className="btn-block btn-square mb-2"
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrint}
                                >
                                    Print
                                </CButton>
                            </CCol>
                        </CRow>

                        <PrintComponent
                            ref={componentRef}
                            invoiceData={invoiceData}
                        />

                        <CRow className="justify-content-center">
                            <CCol xs="12" sm="12" lg="4">
                                <CButton
                                    color="primary"
                                    className="btn-block btn-square mb-2"
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrint}
                                >
                                    Print
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default PosPrint
