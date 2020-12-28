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

const Item = () => {

    const [ items, setItems ] = useState([]);

    const [totalPages, setTotalPages]   = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage]         = useState(1);

    const getItems = async (pgNO) => {
        try {
            const searchParams = { pageNo: pgNO };
            const listResponse = await AuthApi.get(`/items`, {
                params: searchParams
            });
            const { status, data } = listResponse;
            if( status === 200 && data.items !== undefined ){
                setItems(data.items);
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
            const deleteResponse = await AuthApi.delete(`/item-delete/${id}`);
            const { status, data } = deleteResponse;
            if( status === 200 && data.item !== undefined ){
                toast.success(`Item deleted successfully`);
                getItems(currentPage);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    useEffect(() => {
        getItems(currentPage)
    }, [currentPage]);

    return (
        <CRow>
            <CCol xs="12" sm="6" md="12">
                <CCard>
                    <CCardHeader>
                        Items List
                        <div className="card-header-actions">
                            <CButton
                                color="primary"
                                className="btn-square"
                                variant="outline"
                                size="sm"
                                to="item-add"
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
                                    <th>Category Name </th>
                                    <th>Item Name </th>
                                    <th>Price </th>
                                    <th className="text-center">Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                { items && items.map((item, i) => (
                                    <ListTr
                                        key={i.toString()}
                                        srNo={i+1}
                                        item={item}
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

export default Item
