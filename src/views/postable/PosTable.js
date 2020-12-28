import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CWidgetProgress,
    CBadge,
    CTooltip
} from '@coreui/react'
import { Link } from 'react-router-dom';

import { AuthApi } from '../../utils/api';

const PosTable = () => {

    const [ allTables, setAllTables ]   = useState([]);

    const getTableData = async () => {
        try {
            const listResponse = await AuthApi.get(`/tables-ds`);
            const { status, data } = listResponse;
            if( status === 200 ){
                const { tables } = data || {};
                if(tables !== undefined) setAllTables(tables);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    useEffect(() => {
        getTableData()
    }, []);

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Select Table To Create Invoice
                        <div className="card-header-actions">
                            <CBadge color="secondary" className="float-right">Merged</CBadge>
                            <CBadge color="warning" className="float-right ml-1 mr-1">Occupied</CBadge>
                            <CBadge color="success" className="float-right">Available</CBadge>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            { allTables && allTables.map((table, i) => (
                                <CCol xs="12" sm="6" lg="3" key={i.toString()}>
                                    <Link to={`/pos/${table.id}`} className="pos-table-link">
                                        <CTooltip content="Available">
                                            <CWidgetProgress
                                                inverse
                                                color={(table.is_occupied) ? 'warning': 'success'}
                                                variant="inverse"
                                                header={table.name}
                                                text={`Capacity : ${table.capacity} Persons`}
                                            />
                                        </CTooltip>
                                    </Link>
                                </CCol>
                            )) }
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default PosTable
