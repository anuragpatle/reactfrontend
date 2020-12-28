import React, { useState, useEffect } from 'react' // , { lazy }
import { CWidgetBrand, CRow, CCol, CTooltip } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';

import { AuthApi } from '../../utils/api';
import { checkDataIsValid } from '../../utils/secure'

const Dashboard = () => {

	const [ dashData, setDashData ] = useState({});

	const getDashData = async () => {
        try {
            const listResponse = await AuthApi.get(`/dashboard-count`);
			const { status, data } = listResponse;
            if( status === 200 && data.collectAmtCount !== undefined ){
                setDashData(data);
            }
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    useEffect(() => {
        getDashData()
	}, []);

	const { invoiceCount, collectAmtCount, taxAmtCount, tableCount } = dashData || {};

	return (
		<CRow>
			<CCol sm="6" lg="3">
				<CTooltip content="Invoice Count" placement="top">
					<CWidgetBrand
						color="facebook"
						rightHeader={(checkDataIsValid(invoiceCount) && checkDataIsValid(invoiceCount.monthly)) ? invoiceCount.monthly.toString() : '0' }
						rightFooter="this month"
						leftHeader={(checkDataIsValid(invoiceCount) && checkDataIsValid(invoiceCount.today)) ? invoiceCount.today.toString() : '0' }
						leftFooter="today"
					>
						<CIcon
							content={freeSet.cilNotes}
							height="56"
							className="my-4"
						/>
					</CWidgetBrand>
				</CTooltip>
			</CCol>

			<CCol sm="6" lg="3">
				<CTooltip content="Total Collected Amount" placement="top">
					<CWidgetBrand
						color="twitter"
						rightHeader={(checkDataIsValid(collectAmtCount) && checkDataIsValid(collectAmtCount.monthly)) ? Math.round(parseFloat(collectAmtCount.monthly)).toString() : '0' }
						rightFooter="this month"
						leftHeader={(checkDataIsValid(collectAmtCount) && checkDataIsValid(collectAmtCount.today)) ? Math.round(parseFloat(collectAmtCount.today)).toString() : '0' }
						leftFooter="today"
					>
						<CIcon
							content={freeSet.cilMoney}
							height="56"
							className="my-4"
						/>
					</CWidgetBrand>
				</CTooltip>
			</CCol>

			<CCol sm="6" lg="3">
				<CTooltip content="Total Tax Amount" placement="top">
					<CWidgetBrand
						color="linkedin"
						rightHeader={(checkDataIsValid(taxAmtCount) && checkDataIsValid(taxAmtCount.monthly)) ? Math.round(parseFloat(taxAmtCount.monthly)).toString(): '0' }
						rightFooter="this month"
						leftHeader={(checkDataIsValid(taxAmtCount) && checkDataIsValid(taxAmtCount.today)) ? Math.round(parseFloat(taxAmtCount.today)).toString(): '0' }
						leftFooter="today"
					>
						<CIcon
							content={freeSet.cilMoney}
							height="56"
							className="my-4"
						/>
					</CWidgetBrand>
				</CTooltip>
			</CCol>

			<CCol sm="6" lg="3">
				<CTooltip content="Table Status" placement="top">
					<CWidgetBrand
						rightHeader={(checkDataIsValid(tableCount) && checkDataIsValid(tableCount.available)) ? tableCount.available.toString() : '0' }
						rightFooter="available"
						leftHeader={(checkDataIsValid(tableCount) && checkDataIsValid(tableCount.occupied)) ? tableCount.occupied.toString() : '0' }
						leftFooter="occupied"
						color="gradient-warning"
					>
						<CIcon
							name="cil-calendar"
							height="56"
							className="my-4"
						/>
					</CWidgetBrand>
				</CTooltip>
			</CCol>
		</CRow>
	)
}

export default Dashboard
