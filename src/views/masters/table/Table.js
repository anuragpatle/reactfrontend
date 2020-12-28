import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CPagination
} from '@coreui/react'

import { AuthApi } from '../../../utils/api';
import { toast } from 'react-toastify';

import ListTr from './ListTr';

const Table = () => {

    const [ tables, setTables ] = useState([]);

    const [totalPages, setTotalPages]   = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage]         = useState(1);

    const getTables = async (pgNO) => {
        try {
            const searchParams = { pageNo: pgNO };
            const listResponse = await AuthApi.get(`/tables`, {
                params: searchParams
            });
            const { status, data } = listResponse;
            if( status === 200 && data.tables !== undefined ){
                setTables(data.tables);
                const { pageData:{per_page, total_pages} } = data || {};
                setPerPage(per_page);
                setTotalPages(total_pages);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    const deleteRow = async (id) => {
        try {
            const deleteResponse = await AuthApi.delete(`/table-delete/${id}`);
            const { status, data } = deleteResponse;
            if( status === 200 && data.table !== undefined ){
                toast.success(`Table deleted successfully`);
                getTables(currentPage);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    useEffect(() => {
        getTables(currentPage)
    }, [currentPage]);

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Tables List
                        <div className="card-header-actions">
                            <CButton
                                color="primary"
                                className="btn-square"
                                variant="outline"
                                size="sm"
                                to="table-add"
                                >
                                Add
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <table className="table table-hover table-striped table-outline mb-3 d-none d-sm-table">
                            <thead>
                                <tr>
                                    <th>Sr.No </th>
                                    <th>Table Name </th>
                                    <th>Capacity </th>
                                    <th className="text-center">Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                { tables && tables.map((table, i) => (
                                    <ListTr
                                        key={i.toString()}
                                        srNo={i+1}
                                        table={table}
                                        deleteRow={deleteRow}
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

export default Table
