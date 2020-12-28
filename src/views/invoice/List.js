import React, { useState, useEffect } from 'react'
import {
    // CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CPagination
} from '@coreui/react'

import { AuthApi } from '../../utils/api';
// import { toast } from 'react-toastify';

import ListTr from './ListTr';

const List = () => {

    const [ invoices, setInvoices ] = useState([]);

    const [totalPages, setTotalPages]   = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage]         = useState(1);

    const getInvoices = async (pgNO) => {
        try {
            const searchParams = { pageNo: pgNO };
            const listResponse = await AuthApi.get(`/invoices`, {
                params: searchParams
            });
            const { status, data } = listResponse;
            if( status === 200 && data.invoices !== undefined ){
                setInvoices(data.invoices);
                const { pageData:{per_page, total_pages} } = data || {};
                setPerPage(per_page);
                setTotalPages(total_pages);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    useEffect(() => {
        getInvoices(currentPage)
    }, [currentPage]);

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Invoices List
                    </CCardHeader>
                    <CCardBody>
                        <table className="table table-hover table-striped table-outline mb-3 d-none d-sm-table">
                            <thead>
                                <tr>
                                    <th>Sr.No </th>
                                    <th>Invoice No</th>
                                    <th>Table</th>
                                    <th>Date</th>
                                    <th>Sub Total</th>
                                    <th>Discount Amt</th>
                                    <th>Taxable Amt</th>
                                    <th>Tax Amt</th>
                                    <th>Amt To Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                { invoices && invoices.map((invoice, i) => (
                                    <ListTr
                                        key={i.toString()}
                                        invoice={invoice}
                                        srNo={i+1}
                                        currentPage={currentPage}
                                        perPage={perPage}
                                    />
                                )) }
                            </tbody>
                        </table>
                        <CPagination
                            align="center"
                            addListClass="some-class"
                            activePage={currentPage}
                            pages={totalPages}
                            onActivePageChange={setCurrentPage}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default List
